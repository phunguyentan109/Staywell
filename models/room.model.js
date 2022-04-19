const mongoose = require('mongoose')
const moment = require('moment')
const { spliceId } = require('../utils/dbSupport')
const { saveIdToChildren, removeIdFromChildren } = require('./utils')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  priceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price'
  },
  contractIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract'
    }
  ],
  userIds: [
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
  await saveIdToChildren('User', this.get('user_id'), 'room_id', this.get('_id'))
}

roomSchema.methods.clearIdFromUser = async function(userIds) {
  await removeIdFromChildren('User', userIds, 'room_id', this.get('_id'))
}

module.exports = mongoose.model('Room', roomSchema)
