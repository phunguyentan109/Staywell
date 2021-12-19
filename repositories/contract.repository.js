const db = require('../models')

exports.findLean = (params, populatePath, limitPath) => {
  return db.Contract.find(params)
    .populate(populatePath)
    .limit(limitPath)
    .lean()
    .exec()
}

exports.findById = params => {
  return db.Contract.findById(params)
}

exports.findByIdLean = (params, populatePath, select) => {
  return db.Contract.findById(params)
    .populate(populatePath)
    .select(select)
    .lean()
    .exec()
}
