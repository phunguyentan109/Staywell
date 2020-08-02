const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
  electric: {
    number: Number,
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
  paidDate: Date,
  deadline: { type: Date, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Bill', billSchema)
