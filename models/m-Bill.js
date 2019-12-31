const mongoose = require("mongoose");
// const {spliceId} = require("../utils/dbSupport");
// const db = require("../models");

const billSchema = new mongoose.Schema({
    contract_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    },
    electric_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Electric"
        }
    ],
    house_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House"
        }
    ],
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    water: {
        type: Number,
        default: 0
    },
    wifi: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidDate: Date
}, { timestamps: true })

module.exports = mongoose.model("Bill", billSchema);
