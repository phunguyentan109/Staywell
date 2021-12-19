const db = require('../models')

exports.findByIdLean = params => {
  return db.Bill.findById(params).lean().exec()
}
