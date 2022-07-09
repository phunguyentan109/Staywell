const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
    get: v => JSON.parse(v),
    set: v => JSON.stringify(v)
  },
  isVerified: Boolean,
  phone: String,
  job: String,
  birthDate: {
    type: Date,
    default: Date.now
  },
  gender: { type: String, required: true },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  anonymous: {
    type: String,
    set: v => JSON.stringify(v),
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
})

module.exports = mongoose.model('User', userSchema)
