const mongoose = require('mongoose')
const { casDeleteMany } = require('../utils/dbSupport')
const moment = require('moment')

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
  info: {
    electric: { type: Number, default: 0 },
    from: {
      type: Date,
      required: true,
      get: v => moment(v).format('MMMM Do YYYY')
    }
  },
  duration: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
  id: false
})

contractSchema.virtual('info.to').get(function() {
  let from = this.get('info.from', null, { getters: false })
  let to = moment(from).add(this.duration, 'month')
  return to.format('MMMM Do YYYY')
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
