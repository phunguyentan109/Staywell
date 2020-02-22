const db = require("../models");
const {pushId} = require("../utils/dbSupport");

exports.get = async(req, res, next) => {
    try {
        let {room_id} = req.params;
        let contracts = await db.Contract.find({room_id}).populate("bill_id").lean().exec();
        return res.status(200).json(contracts);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {contract_id} = req.params;
        let foundContract = await db.Contract.findById(contract_id).populate("bill_id").lean().exec();
        return res.status(200).json(foundContract);
    } catch (e) {
        return next(e);
    }
}

exports.create = async(req, res, next) => {
    try {
        let {room_id} = req.params;
        let createdContract = await db.Contract.create(req.body);

        // Save contract id to room
        await pushId("Room", room_id, "contract_id", createdContract._id);

        return res.status(200).json({contract_id: createdContract._id});
    } catch (e) {
        return next(e);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let contract = await db.Contract.findById(req.params.contract_id);
        if(contract) await contract.remove();
        return res.status(200).json(contract);
    } catch(err) {
        return next(err);
    }
}
