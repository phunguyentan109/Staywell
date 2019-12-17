const mongoose = require("mongoose");
const db = require("../models");
const {assignId} = require("../utils/dbSupport");

const priceSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: true,
        required: true
    },
    room_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ],
    electric: {
        type: Number,
        default: 0,
        required: true
    },
    wifi: {
        type: Number,
        default: 0,
        required: true
    },
    water: {
        type: Number,
        default: 0,
        required: true
    },
    house: {
        type: Number,
        default: 0,
        required: true
    },
    extra: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 6
    }
})

priceSchema.pre("remove", async function(next){
    try {
        await assignId("Room", this.room_id, "price_id", false);
        return next();
    } catch (err) {
        return next(err);
    }
})

module.exports = mongoose.model("Price", priceSchema);
