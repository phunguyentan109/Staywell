const mongoose = require("mongoose");
// const {spliceId} = require("../utils/dbSupport");
// const db = require("../models");

const billSchema = new mongoose.Schema({
    electric: {
        type: Number,
        default: 0
    },
    house: {
        type: Number,
        default: 0
    },
    water: {
        type: Number,
        default: 0
    },
    wifi: {
        type: Number,
        default: 0
    },
    contract_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    },
    inContract: {
        type: Boolean,
        default: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidDate: Date
}, { timestamps: true })

module.exports = mongoose.model("Bill", billSchema);
