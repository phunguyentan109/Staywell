const db = require("../models");
const {pushId, assignId, spliceId} = require("../utils/dbSupport");
const mail = require("../utils/mail");
const moment = require("moment");

async function createContract(user_id, price_id, electricNumber, peopleNumber, roomName) {
    let createdContract = await db.Contract.create({user_id, room: roomName});

    // Get the duration from price to set the contract timeline
    let priceData = await db.Price.findById(price_id).lean().exec();
    for(let i = 1; i <= priceData.duration; i++) {

        let isFirstBill = createdContract.bill_id.length === 0;

        let endTime = isFirstBill ? moment().add(i, "months").subtract(1, "days") : moment().add(i, "months");

        // create all bill of the contract
        let createdBill = await db.Bill.create({
            contract_id: createContract._id, endTime
        })

        // Add starting time point for each bill
        let createdTimePoint = await db.TimePoint.create({
            bill_id: createdBill._id,
            people: isFirstBill ? peopleNumber : undefined,
            time: isFirstBill ? moment() : endTime
        });

        createdBill.timePoint_id.push(createdTimePoint._id);
        createdBill.save();

        createdContract.bill_id.push(createdBill._id);
        await createdContract.save();
    }
    await pushId("User", user_id, "contract_id", createdContract._id);
}

exports.get = async(req, res, next) => {
    try {
        let list = await db.Room.find().populate("price_id").populate("user_id").lean().exec();
        return res.status(200).json(list);
    } catch(err) {
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        let one = await db.Room.findById(req.params.room_id).populate("price_id").populate("user_id").lean().exec();
        return res.status(200).json(one);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let createdRoom = await db.Room.create(req.body);
        const {price_id} = req.body;

        // add room_id to price and user
        await pushId("Price", price_id, "room_id", createdRoom._id);
        createdRoom = await createdRoom.save();

        return res.status(200).json(createdRoom);
    } catch(err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundRoom = await db.Room.findById(req.params.room_id);
        if(foundRoom) await foundRoom.remove();
        return res.status(200).json(foundRoom);
    } catch(err) {
        return next(err);
    }
}

exports.update = async(req, res, next) => {
    try{
        const {room_id} = req.params;
        let {name, price_id} = req.body;
        let foundRoom = await db.Room.findById(room_id);

        // update room
        foundRoom.name = name;
        if(!foundRoom.price_id.equals(price_id)) {
            await spliceId("Price", foundRoom.price_id, "room_id", foundRoom._id);
            foundRoom.price_id = price_id;
            await pushId("Price", price_id, "room_id", foundRoom._id);
        }
        await foundRoom.save();

        return res.status(200).json(foundRoom);
    } catch(err) {
        return next(err);
    }
}

exports.assign = async(req, res, next) => {
    try {
        const {room_id} = req.params;
        const {amount} = req.body;
        let foundRoom = await db.Room.findById(room_id).populate("price_id").exec();
        let roomPeopleNumber = foundRoom.user_id.length; // get number of people in room (before)

        // Get only the id of user
        let user_id = req.body.user_id.map(user => user._id);

        // determine old people and current user
        let newUser = [], oldUser = [], curUser = [];
        for(let id of foundRoom.user_id) {
            let isExist = user_id.some(uid => id.equals(uid));
            if(isExist) curUser.push(id);
            else oldUser.push(id);
        }

        // determine new user
        for(let uid of user_id) {
            let isExist = foundRoom.user_id.some(id => id.equals(uid));
            if(!isExist) newUser.push(uid);
        }

        // remove room id of old user
        if(oldUser.length > 0) {
            for(let id of oldUser) {
                await assignId("User", id, "room_id", false);

                // Close the contract
                let foundContract = await db.Contract.findOne({user_id: id});
                if(foundContract) {
                    foundContract.active = false;
                    foundContract.save();
                }

                // send mail to notify user about removing from the room
                let foundUser = await db.User.findById(id).lean().exec();
                let {email, username} = foundUser;
                mail.leaveRoom(email, username, foundRoom.name);
            }
        }

        // assign room id for new people
        if(newUser.length > 0) {
            for(let id of newUser) {
                await assignId("User", id, "room_id", foundRoom._id);

                // Create contract with information of room and the timeline
                await createContract(id, foundRoom.price_id, amount, roomPeopleNumber, foundRoom.name);

                // send mail to notify people about new place
                let foundUser = await db.User.findById(id).lean().exec();
                let {email, username} = foundUser;
                mail.getRoom(email, username, foundRoom.name);
            }
        }

        if(curUser.length > 0) {
            for(let people of curUser) {
                let foundContract = await db.Contract.findOne({
                    user_id: people._id,
                    active: true
                }).populate({
                    path: "bill_id",
                    populate: { path: "timePoint_id" }
                }).lean().exec();

                // get current bill
                let currentBill_id = foundContract.bill_id.filter(b => moment(b.endTime).isSameOrAfter(moment()))[0]._id;
                let foundBill = await db.Bill.findById(currentBill_id);

                // create new time point
                let createdTimePoint = await db.TimePoint.create({
                    bill_id: currentBill_id,
                    time: moment(),
                    // time: moment().add(Math.random() * 5, "days"),
                    people: roomPeopleNumber,
                    number: amount
                });

                foundBill.timePoint_id.push(createdTimePoint._id);
                await foundBill.save();
            }
        }

        foundRoom.user_id = [...curUser, ...newUser];
        foundRoom = await foundRoom.save();

        return res.status(200).json(foundRoom);
    } catch (e) {
        return next(e);
    }
}
