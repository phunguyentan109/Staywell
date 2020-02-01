const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    bill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Electric"
    },
    money: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model("House", houseSchema);
