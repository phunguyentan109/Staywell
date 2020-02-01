const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    bill_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill"
        }
    ],
    timeline: [Date],
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Contract", contractSchema);
