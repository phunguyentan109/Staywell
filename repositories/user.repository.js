const db = require('../models')

exports.create = (data) => {
  return db.User.create(data)
}

exports.findOne = (data) => {
  return db.User.findOne(data)
}

exports.findUserRole = ({ user_id }) => {
  return db.UserRole.find({ user_id }).populate('role_id').lean().exec()
}

exports.find = (params) => {
  return db.User
    .find(params)
    .populate('room_id')
    .lean().exec()
}

exports.findLean = (params) => {
  return db.User.find(params).lean().exec()
}

exports.findById = (userId) => {
  return db.User.findById(userId)
}

exports.findByIdAndUpdate = (data) => {
  const { params, body } = data
  return db.User.findByIdAndUpdate(params, body, { new: true })
}

exports.getNoAssign = (peopleIds) => {
  return db.User.find({ _id: { $in: peopleIds }, room_id: undefined })
    .populate('user_id')
    .lean()
    .exec()
}
