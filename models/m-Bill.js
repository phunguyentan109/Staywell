const mongoose = require('mongoose')
const moment = require('moment')

const billSchema = new mongoose.Schema({
  electric: {
    number: Number,
    amount: Number,
  },
  living: Number,
  water: Number,
  wifi: Number,
  contract_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  },
  appliedPrice: {
    type: String,
    set: v => JSON.stringify(v),
    get: v => v ? JSON.parse(v) : '',
  },
  paidDate: { type: Date, get: formatDate },
  deadline: { type: Date, required: true, get: formatDate },
  comment: String
}, {
  timestamps: true,
  toJSON: { getters: true }
})

billSchema.plugin(require('mongoose-lean-getters'))

function formatDate(v) {
  if (v) return moment(v).format('Do MMM, YYYY')
}

module.exports = mongoose.model('Bill', billSchema)
