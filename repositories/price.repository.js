const db = require('../models')

exports.create = (data) => {
  return db.Price.create(data)
}

exports.find = (params, select) => {
  return db.Price.find(params).select(select)
}

exports.findOne = (params) => {
  return db.Price.findOne(params)
}

exports.findById = (params) => {
  return db.Price.findById(params)
}

exports.findByIdAndUpdate = (params, body) => {
  return db.Price.findByIdAndUpdate(params, body, { new: true })
}
