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
        let {name, price_id, user_id} = req.body;
        let foundRoom = await db.Room.findById(room_id);

        // remove old people and add new people to the room
        const NOT_FOUND = -1;
        let oldUser = foundRoom.user_id.filter(id => user_id.indexOf(id) === NOT_FOUND);
        let curUser = foundRoom.user_id.filter(id => user_id.indexOf(id) !== NOT_FOUND);
        let newUser = user_id.filter(id => curUser.indexOf(id) === NOT_FOUND);

        // remove room id of old people
        for(let id of oldUser) {
            await assignId("User", id, "room_id", false);

            // send mail to notify people about removing from the room
            let foundUser = await db.User.findById(id).lean().exec();
            let {email, viewname} = foundUser;
            await mail.leaveRoom(email, viewname, foundRoom.name);
        }

        // assign room id for new people
        for(let id of newUser) {
            await assignId("User", id, "room_id", foundRoom._id);

            // send mail to notify people about new place
            let foundUser = await db.User.findById(id).lean().exec();
            let {email, viewname} = foundUser;
            await mail.getRoom(email, viewname, foundRoom.name);
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
        foundRoom = await foundRoom.save();

        return res.status(200).json(foundRoom);
    } catch(err){
        return next(err);
    }
}
