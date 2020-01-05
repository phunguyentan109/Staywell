const db = require("../models");
const {pushId, assignId, spliceId} = require("../utils/dbSupport");
const mail = require("../utils/mail");
const moment = require("moment");

async function createContract(user_id, price_id, electricNumber, peopleNumber) {
    let createdContract = await db.Contract.create({user_id});
    // Get the duration from price to set the contract timeline
    let priceData = await db.Price.findById(price_id).lean().exec();
    for(let i = 1; i <= priceData.duration; i++) {
        // create all bill of the contract
        let createdBill = await db.Bill.create({
            contract_id: createContract._id,
            endTime: moment().add(i, "months")
        })

        // Check if the pre-push bill is the contract's first bill, add starting electric and house bill
        if(createdContract.bill_id.length === 0) {
            let createdElectric = await db.Electric.create({
                bill_id: createdBill._id,
                time: Date.now(),
                people: peopleNumber,
                number: electricNumber
            });

            let createdHouse = await db.House.create({
                bill_id: createdBill._id,
                time: Date.now(),
                people: peopleNumber
            })

            createdBill.electric_id.push(createdElectric._id);
            createdBill.house_id.push(createdHouse._id);
            createdBill.save();
        }

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
        const {user_id, amount} = req.body;
        let foundRoom = await db.Room.findById(room_id).populate("price_id").exec();

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

                // Create contract with information of room and the timeline
                await createContract(id, foundRoom.price_id, amount, foundRoom.user_id.length);

                // send mail to notify people about new place
                let foundUser = await db.User.findById(id).lean().exec;
                let {email, username} = foundUser;
                mail.getRoom(email, username, foundRoom.name);
            }
        }

        if(curUser.length > 0) {
            // create electric sub-bill for current people
            for(let people of curUser) {
                let foundContract = await db.Contract.findOne({
                    user_id: people._id,
                    active: true
                }).populate({
                    path: "bill_id",
                    populate: { path: "electric_id" }
                }).populate({
                    path: "bill_id",
                    populate: { path: "house_id" }
                }).lean().exec();

                // get current bill
                let currentBill = foundContract.bill_id.filter(b => moment(b.endTime).isSameOrAfter(moment()))[0];

                // get number of people in room (before)
                let roomPeopleNumber = foundRoom.user_id.length;

                // CREATE ELECTRIC SUB-BILL
                // get last electric number of the contract
                let electricBills = foundContract.bill_id.map(b => b.electric_id).flat().map(elec => elec);
                let lastElectricNum = Math.max(...(electricBills.map(e => e.number)));
                let lastElectricBill = electricBills.filter(e => e.number === lastElectricNum)[0];

                // total electric money
                let totalElectricMoney = (amount - lastElectricNum) * foundRoom.price_id.electric;
                // each person electric money
                let eachElectricMoney = totalElectricMoney / roomPeopleNumber;
                let createdElectric = await db.Electric.create({
                    bill_id: currentBill._id,
                    number: amount,
                    time: {
                        begin: moment(lastElectricBill.time.end).add(1, "days"),
                        end: moment(),
                        length: moment(moment(lastElectricBill.time.end).add(1, "days")).diff(moment()) + 1
                    },
                    room: {
                        name: foundRoom.name,
                        numberOfPeople: roomPeopleNumber
                    },
                    money: eachElectricMoney
                });

                // CREATE HOUSE SUB-BILL
                // get last house sub bill
                let houseBillDates = foundContract.bill_id.map(b => b.house_id).flat().map(h => h.time.end).sort((a, b) => moment(b).isAfter(a));
                let lastDate = houseBillDates[houseBillDates.length - 1];

                // get the planned live dates and actual result before calculating money
                let expectLiveDays = moment(currentBill.endTime).diff(moment(), "days") + 1;
                let actualLiveDays = moment(lastDate).diff(moment(), "days") + 1;
                let liveDayRate = expectLiveDays / actualLiveDays;

                // calculate the money for each current user
                let additionHousePrice = foundRoom.price_id.extra * (roomPeopleNumber - 1);
                let totalHouseMoney = (foundRoom.price_id.house + additionHousePrice);
                let eachHouseMoney = totalHouseMoney / roomPeopleNumber * liveDayRate;

                let createdHouse = await db.House.create({
                    bill_id: currentBill._id,
                    time: {
                        begin: moment(lastElectricBill.time.end).add(1, "days"),
                        end: moment(),
                        length: moment(moment(lastElectricBill.time.end).add(1, "days")).diff(moment()) + 1
                    },
                    room: {
                        name: foundRoom.name,
                        numberOfPeople: roomPeopleNumber
                    },
                    money: eachHouseMoney
                });

                currentBill.electric_id.push(createdElectric._id);
                currentBill.house_id.push(createdHouse._id);
                await currentBill.save();
            }
        }

        foundRoom.user_id = [...curUser, ...newUser];
        foundRoom = await foundRoom.save();

        return res.status(200).json(foundRoom);
    } catch (e) {
        return next(e);
    }
}
