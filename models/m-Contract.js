const mongoose = require("mongoose");
const {casDeleteMany} = require("../utils/dbSupport");
const db = require("../models");

const contractSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bill_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill"
        }
    ],
    room: String,
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

contractSchema.pre("save", async function(next) {
    try {
        // if the contract is not active, all the bill are in paid status
        if(this.isModified("active") && !this.active && this.bill_id.length > 0) {
            await db.Bill.updateMany({ isPaid: false, contract_id: this._id }, {
                $set: {
                    isPaid: true,
                    paidDate: Date.now()
                }
            })
        }
        return next();
    } catch (e) {
        return next(e);
    }
})

contractSchema.pre("remove", async function(next) {
    try {
        await casDeleteMany("Bill", this.bill_id);
        return next();
    } catch (e) {
        return next(e);
    }
})

module.exports = mongoose.model("Contract", contractSchema);
