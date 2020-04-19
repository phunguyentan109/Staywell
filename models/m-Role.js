const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true
  },
  type: String
})

module.exports = mongoose.model('Role', roleSchema)
