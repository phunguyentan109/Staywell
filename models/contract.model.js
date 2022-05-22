const mongoose = require('mongoose')
const { casDeleteMany } = require('../utils/dbSupport')
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate-v2')

const contractSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  bill_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill'
    }
  ],
  usedNumbers: {
    electric: { type: Number, default: 0 },
  },
  startDate: { type: Date, required: true, get: v => moment(v).format() },
  deposit: { type: Number, required: true },
  duration: { type: Number, required: true },
  active: { type: Boolean, default: false },
}, {
  timestamps: true,
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true },
  id: false
})

contractSchema.plugin(mongoosePaginate)

contractSchema.virtual('endDate').get(function() {
  let from = this.get('startDate', null, { getters: false })
  return moment(from).add(this.duration, 'month').format()
})

contractSchema.virtual('isFullTime').get(function() {
  return this.duration === this.bill_id.length
})

contractSchema.pre('remove', async function(next) {
  try {
    await casDeleteMany('Bill', this.bill_id)
    return next()
  } catch (e) {
    return next(e)
  }
})

module.exports = mongoose.model('Contract', contractSchema)
