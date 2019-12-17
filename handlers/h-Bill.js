const db = require("../models");
const moment = require("moment");
const {pushId} = require("../utils/dbSupport");

exports.get = async(req, res, next) => {
    try{
        const {room_id} = req.params;
        let bills = await db.Bill.find({room_id});
        return res.status(200).json(bills);
    } catch(err){
        return next(err);
    }
}

exports.getOne = async(req, res, next) => {
    try{
        let bill = await db.Bill.findById(req.params.bill_id);
        return res.status(200).json(bill);
    } catch(err){
        return next(err);
    }
}

exports.create = async(req, res, next) => {
    try {
        let {amount} = req.body;
        let {room_id} = req.params;

        // find previous bill
        let room = await db.Room.findById(room_id).populate("bill_id").populate("price_id").exec();
        let price = room.price_id;
        let prevAmount = 0;
        if(room.bill_id && room.bill_id.length > 0) {
            let bills = room.bill_id;
            let lastDate = moment.max(bills.map(bill => moment(bill.pay.time)));
            let prevBill = bills.filter(b => moment(b.pay.time).isSame(lastDate))[0];
            prevAmount = prevBill.electric.amount;
        }

        // calculate the bill with price and create
        let bill = {
            electric: {
                amount: amount,
                cost: (amount - prevAmount) * price.electric
            },
            water: price.water * (room.people_id.length !== 0 ? room.people_id.length : 1),
            house: price.house + (price.extra * (room.people_id.length !== 0 ? room.peole_id.length - 1 : 0)),
            wifi: price.wifi
        }
        let newBill = await db.Bill.create(bill);

        // save bill_id to room
        await pushId("Room", room_id, "bill_id", newBill._id);
        // save room_id to bill
        newBill.room_id = req.params.room_id;
        newBill.pay.status = true;
        newBill.inContract = false;
        await newBill.save();

        return res.status(200).json(newBill);
    } catch (err) {
        return next(err);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let foundBill = await db.Bill.findById(req.params.bill_id);
        if(foundBill) await foundBill.remove();
        return res.status(200).json(foundBill);
    } catch(err) {
        return next(err);
    }
}

exports.update  = async(req, res, next) => {
    try {
        const {bill_id, room_id} = req.params;
        let bill = await db.Bill.findById(bill_id);
        let bills = await db.Bill.find({room_id});

        let {amount, status, reset} = req.body;
        if(!reset) {
            // get room's price
            let room = await db.Room.findById(room_id).populate("price_id").exec();
            let {electric, water, extra, house, wifi} = room.price_id;

            // update amount
            if(amount) {
                // get last month used electric amount
                let doneBill = bills.filter(v => v.water !== 0);
                let prevAmount = 0;
                if(doneBill.length > 0) {
                    let lastDate = moment.max(doneBill.map(b => moment(b.pay.time)));
                    let prevBill = bills.filter(b => moment(b.pay.time).isSame(lastDate))[0];
                    prevAmount = prevBill.electric.amount;
                }
                if(amount <= prevAmount) {
                    return next({
                        status: 400,
                        message: "The entered amount must be greater than the previous month's amount."
                    })
                }
                bill.electric = {
                    amount: amount,
                    cost: (amount - prevAmount) * electric
                };
            }

            // update payment status
            if(status !== undefined) bill.pay.status = status;

            // calculate others missing bill fee
            if(bill.water === 0) {
                bill.water = water * room.people_id.length,
                bill.house = house + (extra * (room.people_id.length - 1)),
                bill.wifi = wifi;
            }
        } else {
            bill.pay.status = false;
            bill.house = 0;
            bill.water = 0;
            bill.electric.amount = 0;
            bill.electric.cost = 0;
            bill.wifi = 0;
        }
        await bill.save();

        // search for unfinished bills
        let unfinishedBills = await db.Bill.find({room_id, water: 0});
        if(unfinishedBills.length === 0) {
            // if all are finished, close the contract
            await db.Bill.updateMany({room_id, inContract: true}, {inContract: false});
            // then initial new contract for room
            let billList = [];
            let foundRoom = await db.Room.findById(room_id);
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
            // save new contract's bill to room
            let {bill_id} = foundRoom;
            foundRoom.bill_id = [...bill_id, ...billList];
            await foundRoom.save();
        }
        return res.status(200).json(bill);
    } catch(err) {
        console.log(err);
        return next(err);
    }
}
