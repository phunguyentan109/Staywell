const mongoose = require('mongoose')
const { casDeleteMany, spliceId } = require('../utils/dbSupport')
const db = require('../models')

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
  start: {
    electric: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      required: true
    }
  },
  duration: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

contractSchema.pre('save', async function(next) {
  try {
    // if the contract is not active, all the bill are in paid status
    if (this.isModified('active') && !this.active && this.bill_id.length > 0) {
      await db.Bill.updateMany({ isPaid: false, contract_id: this._id }, {
        $set: {
          isPaid: true,
          paidDate: Date.now()
        }
      })
    }
    return next()
  } catch (e) {
    return next(e)
  }
})

contractSchema.pre('remove', async function(next) {
  try {
    await casDeleteMany('Bill', this.bill_id)
    await spliceId('User', this.user_id, 'contract_id', this._id)
    return next()
  } catch (e) {
    return next(e)
  }
})

module.exports = mongoose.model('Contract', contractSchema)
