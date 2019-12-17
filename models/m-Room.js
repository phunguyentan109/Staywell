const mongoose = require("mongoose");
const db = require("./index");
const {spliceId, assignId} = require("../utils/dbSupport");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Price"
    },
    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Room", roomSchema);
