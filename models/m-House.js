const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    bill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    },
    time: Date,
    people: Number
}, {timestamps: true});

module.exports = mongoose.model("House", houseSchema);
