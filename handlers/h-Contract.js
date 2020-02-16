const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let contracts = await db.Contract.find({user_id})
        .populate({
            path: "user_id",
            populate: {
                path: "room_id",
                populate: {
                    path: "price_id"
                }
            }
        })
        .populate({
            path: "bill_id",
            populate: {
                path: "timePoint_id"
            }
        }).lean().exec();
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
        let createdContract = await db.Contract.create(req.body);
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
