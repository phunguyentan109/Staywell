const mongoose = require("mongoose");
const {casDeleteMany} = require("../utils/dbSupport");

const billSchema = new mongoose.Schema({
    contract_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    },
    timePoint_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TimePoint"
        }
    ],
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
    endTime: {
        type: Date,
        required: true
    },
    isRevealed: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidDate: Date
}, { timestamps: true });

billSchema.pre("remove", async function(next) {
    try {
        await casDeleteMany("TimePoint", this.timePoint_id);
        return next();
    } catch (e) {
        return next(e);
    }
})

module.exports = mongoose.model("Bill", billSchema);
