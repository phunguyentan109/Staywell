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

roomSchema.pre("remove", async function(next) {
    try {
        await spliceId("Price", this.price_id, "room_id", this._id);
        next();
    } catch (e) {
        return next(e);
    }
})

module.exports = mongoose.model("Room", roomSchema);
