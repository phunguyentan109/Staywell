const db = require('../models')

exports.find = params => {
  return db.User.find(params)
    .populate('room_id')
    .populate('user_id')
    .lean()
    .exec()
}

exports.findOne = params => {
  return db.User.findOne(params)
}

exports.findById = params => {
  return db.User.findById(params)
}

exports.findByIdAndUpdate = (params, body) => {
  return db.User.findByIdAndUpdate(params, body, { new: true })
}
