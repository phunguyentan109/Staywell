const mongoose = require('mongoose')
// const {spliceId} = require("../utils/dbSupport");
// const db = require("../models");

const billSchema = new mongoose.Schema({
  electric: {
    number: { type: Number, default: 0 },
    amount: Number,
    cost: Number
  },
  living: Number,
  water: Number,
  wifi: Number,
  contract_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  },
  payment: {
    state: { type: Boolean, default: false },
    at: Date
  },
  deadline: { type: Date, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Bill', billSchema)
