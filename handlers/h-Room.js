const db = require('../models')
const { pushId } = require('../utils/dbSupport')

exports.get = async(req, res, next) => {
  try {
    let list = await db.Room.find()
      .populate('price_id')
      .populate('user_id')
      .lean().exec()

    return res.status(200).json(list)
  } catch (err) {
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    let one = await db.Room.findById(req.params.room_id)
      .populate('price_id')
      .populate('user_id')
      .lean().exec()

    return res.status(200).json(one)
  } catch (err) {
    return next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    let createdRoom = await db.Room.create(req.body)
    const { price_id } = req.body

    // add room_id to price and user
    await pushId('Price', price_id, 'room_id', createdRoom._id)
    createdRoom = await createdRoom.save()

    return res.status(200).json(createdRoom)
  } catch (err) {
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundRoom = await db.Room.findById(req.params.room_id)
    if (foundRoom) await foundRoom.remove()
    return res.status(200).json(foundRoom)
  } catch (err) {
    return next(err)
  }
}
