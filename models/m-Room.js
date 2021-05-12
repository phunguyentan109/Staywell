const mongoose = require('mongoose')
const moment = require('moment')
const { spliceId } = require('../utils/dbSupport')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Price'
  },
  contract_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract'
    }
  ],
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  deleteAt: {
    type: Date,
    get: v => moment(v).format('MMMM Do YYYY')
  }
})

roomSchema.pre('remove', async function(next) {
  try {
    await spliceId('Price', this.price_id, 'room_id', this._id)
    next()
  } catch (e) {
    return next(e)
  }
})

module.exports = mongoose.model('Room', roomSchema)
