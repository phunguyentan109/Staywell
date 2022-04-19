const db = require('../models')
const { writeIdToDoc, clearIdFromDoc } = require('./utils')

exports.find = async (params, populates) => {
  const foundRooms = await db.Room.find(params)

  if (populates) {
    await db.Room.populate(foundRooms, populates)
  }

  return foundRooms
}

exports.findLean = (params) => {
  return exports.find(params).lean().exec()
}

exports.findOne = params => db.Room.findOne(params)

exports.clearIdFromUser = async (roomId, removeOne) => {
  await clearIdFromDoc('User', removeOne, 'room_id', roomId)
}

exports.writeIdToUser = async (roomId, newOne) => {
  await writeIdToDoc('User', newOne, 'room_id', roomId)
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

exports.update = (params, body) => {
  return db.Room.findOneAndUpdate(params, body, { new: true })
}
