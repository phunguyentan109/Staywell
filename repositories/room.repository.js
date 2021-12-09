const db = require('../models')

exports.find = (params) => {
  return db.Room.find(params)
    .populate('price_id')
    .populate('user_id')
}

exports.findLean = (params) => {
  return db.Room.find(params)
    .populate('price_id')
    .populate('user_id')
    .lean().exec()
}

exports.findById = (params) => {
  return db.Room.findById(params)
}

exports.findByIdLean = (params) => {
  return db.Room.findById(params)
    .populate('price_id')
    .populate('user_id')
    .lean().exec()
}

exports.findByIdAndUpdate = (params, body) => {
  return db.Room.findByIdAndUpdate(params, body, { new: true })
}
