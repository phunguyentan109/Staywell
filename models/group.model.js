const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  permissions: [String],
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Group', groupSchema)
