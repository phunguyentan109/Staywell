const mongoose = require('mongoose')
const moment = require('moment')
const { spliceId } = require('../utils/dbSupport')
const { writeIdToDoc, clearIdFromDoc } = require('./utils')

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

roomSchema.methods.addIdToUser = async function() {
  await writeIdToDoc('User', this.get('user_id'), 'room_id', this.get('_id'))
}

roomSchema.methods.clearIdFromUser = async function(userIds) {
  await clearIdFromDoc('User', userIds, 'room_id', this.get('_id'))
}

module.exports = mongoose.model('Room', roomSchema)
