const db = require('../models')

exports.create = (data) => {
  return db.User.create(data)
}

exports.findOne = (data) => {
  return db.User.findOne(data)
}

exports.findUserGroup = (userId) => {
  return db.Group.findOne({ userIds: userId }).lean().exec()
}

exports.find = (params) => {
  return db.User
    .find(params)
    .populate('roomId')
    .lean().exec()
}

exports.findLean = (params) => {
  return db.User.find(params).lean().exec()
}

exports.findById = (userId) => {
  return db.User.findById(userId)
}

exports.findByIdAndUpdate = (userId, data) => {
  return db.User.findByIdAndUpdate(userId, data, { new: true })
}

exports.getNoAssign = (peopleIds) => {
  return db.User.find({ _id: { $in: peopleIds }, roomId: undefined })
    .lean()
    .exec()
}
