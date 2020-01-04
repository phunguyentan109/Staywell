const mongoose = require("mongoose");
const {casDeleteMany} = require("../utils/dbSupport");

const billSchema = new mongoose.Schema({
    contract_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    },
    electric_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Electric"
        }
    ],
    house_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House"
        }
    ],
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
        await casDeleteMany("House", this.house_id);
        await casDeleteMany("Electric", this.electric_id);
        return next();
    } catch (e) {
        return next(e);
    }
})

module.exports = mongoose.model("Bill", billSchema);
