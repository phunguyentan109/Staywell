const db = require("../models");
const {pushId, assignId, spliceId, casDeleteMany} = require("../utils/dbSupport");
const mail = require("../utils/mail");
const moment = require("moment");

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
        let one = await db.Room.findById(req.params.room_id).populate("bill_id").populate("user_id").lean().exec();
        return res.status(200).json(one);
    } catch(err) {
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let createdRoom = await db.Room.create(req.body);
        const {price_id, user_id} = req.body;

        // add room_id to price and people
        await pushId("Price", price_id, "room_id", createdRoom._id);
        for(let id of user_id) {
            await assignId("People", id, "room_id", createdRoom._id);
        }
        await createdRoom.save();

        let foundRoom = await db.Room.findById(createdRoom._id).populate("user_id").populate("price_id").lean().exec();

        return res.status(200).json(foundRoom);
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
        let {name, desc, people_id, price_id} = req.body;
        people_id = people_id.map(p => p._id);
        let foundRoom = await db.Room.findById(room_id);

        // remove old people and add new people to the room
        let oldPeople = foundRoom.people_id.filter(id => people_id.indexOf(id) === -1);
        let curPeople = foundRoom.people_id.filter(id => people_id.indexOf(id) !== -1);
        let newPeople = people_id.filter(id => curPeople.indexOf(id) === -1);

        // remove room id of old people
        for(let id of oldPeople) {
            await assignId("People", id, "room_id", false);

            // send mail to notify people about removing from the room
            let foundPeople = await db.People.findById(id).populate("user_id").exec();
            let {email, viewname} = foundPeople.user_id;
            await mail.leaveRoom(email, viewname, foundRoom.name);
        }

        // assign room id for new people
        for(let id of newPeople) {
            await assignId("People", id, "room_id", foundRoom._id);

            // send mail to notify people about new place
            let foundPeople = await db.People.findById(id).populate("user_id").exec();
            let {email, viewname} = foundPeople.user_id;
            await mail.getRoom(email, viewname, foundRoom.name);
        }

        let updatePeople_id = [...curPeople, ...newPeople];
        let billList = [];
        if(updatePeople_id.length > 0) {
            // Generate bill timeline in case the room is in used after a time
            if(foundRoom.people_id.length === 0) {
                let price = await db.Price.findById(foundRoom.price_id);
                for(let i = 1; i <= price.duration; i++) {
                    let bill = await db.Bill.create({
                        pay: {
                            time: moment().add(i, "M")
                        },
                        room_id: foundRoom._id
                    })
                    billList.push(bill._id);
                }
            }
        } else {
            // Removing bill timeline in case the room is empty after editing
            if(foundRoom.people_id.length !== 0) {
                let foundBills = await db.Bill.find({room_id: foundRoom._id, water: 0});
                let foundBill_ids = foundBills.map(v => v._id);
                await casDeleteMany("Bill", foundBill_ids);

                // close contract (no active bill)
                await db.Bill.updateMany({room_id: foundRoom._id, inContract: true}, {inContract: false, "pay.status": true});
            }
        }

        // Room data has been modified so we need to retrieve room data again
        let updatedRoom = await db.Room.findById(room_id);
        // update room
        updatedRoom.bill_id = billList;
        updatedRoom.people_id = updatePeople_id;
        updatedRoom.name = name;
        updatedRoom.desc = desc;
        if(updatedRoom.price_id !== price_id) {
            await spliceId("Price", updatedRoom.price_id, "room_id", updatedRoom._id);
            updatedRoom.price_id = price_id;
            await pushId("Price", price_id, "room_id", updatedRoom._id);
        }
        await updatedRoom.save();

        return res.status(200).json(updatedRoom);
    } catch(err){
        return next(err);
    }
}
