const db = require("../models");
const {pushId, assignId, spliceId} = require("../utils/dbSupport");
const mail = require("../utils/mail");
const moment = require("moment");

async function createContract(user_id, price_id) {
    let contract = { user_id, timeline: [] };
    // Get the duration from price to set the contract timeline
    let priceData = await db.Price.findById(price_id).lean().exec();
    for(let i = 1; i <= priceData.duration; i++) {
        let time = moment(Date.now()).add(i, "months");
        contract.timeline.push(time);
    }
    let createdContract = await db.Contract.create(contract);
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
        const {price_id, user_id} = req.body;

        // add room_id to price and user
        await pushId("Price", price_id, "room_id", createdRoom._id);
        if(user_id.length > 0) {
            for(let id of user_id) {
                await assignId("User", id, "room_id", createdRoom._id);
                await createContract(id, price_id);
            }
        }
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
        let {name, price_id, user_id} = req.body;
        let foundRoom = await db.Room.findById(room_id);

        // remove old people and add new user to the room
        const NOT_FOUND = -1;
        let oldUser = foundRoom.user_id.filter(id => user_id.indexOf(id) === NOT_FOUND);
        let curUser = foundRoom.user_id.filter(id => user_id.indexOf(id) !== NOT_FOUND);
        let newUser = user_id.filter(id => curUser.indexOf(id) === NOT_FOUND);

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

                await createContract(id, price_id);

                // send mail to notify people about new place
                let foundUser = await db.User.findById(id).lean().exec();
                let {email, username} = foundUser;
                mail.getRoom(email, username, foundRoom.name);
            }
        }
        let updateUser_id = [...curUser, ...newUser];

        // update room
        foundRoom.user_id = updateUser_id;
        foundRoom.name = name;
        if(!foundRoom.price_id.equals(price_id)) {
            await spliceId("Price", foundRoom.price_id, "room_id", foundRoom._id);
            foundRoom.price_id = price_id;
            await pushId("Price", price_id, "room_id", foundRoom._id);
        }
        await foundRoom.save();

        return res.status(200).json(foundRoom);
    } catch(err){
        return next(err);
    }
}
