const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  type: String,
  desc: String
})

module.exports = mongoose.model('Role', roleSchema)
