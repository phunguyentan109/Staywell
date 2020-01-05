const db = require("../models");

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let contracts = await db.Contract.find({user_id})
        .populate({
            path: "bill_id",
            populate: {
                path: "electric_id"
            }
        }).populate({
            path: "bill_id",
            populate: {
                path: "house_id"
            }
        }).lean().exec();
        return res.status(200).json(contracts);
    } catch (e) {
        return next(e);
    }
}

exports.remove = async(req, res, next) => {
    try {
        let contract = await db.Contract.findById(req.params.contract_id);
        if(contract) contract.remove();
        return res.status(200).json(contract);
    } catch(err) {
        return next(err);
    }
}
