const mongoose = require("mongoose");

const timePointSchema = new mongoose.Schema({
    bill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    },
    time: Date,
    people: Number,
    number: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("TimePoint", timePointSchema);
