const mongoose = require("mongoose");
const db = require("../models");
const {spliceId, casDelete} = require("../utils/dbSupport");

const peopleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    job: String,
    birthDate: {
        type: Date,
        default: Date.now
    }
})

peopleSchema.pre("remove", async function(next){
    try {
        await spliceId("Room", this.room_id, "people_id", this._id);
        await casDelete("User", "_id", this.user_id);
        return next();
    } catch(err) {
        return next(err);
    }
})

module.exports = mongoose.model("People", peopleSchema);
