const moment = require('moment')
const db = require('../models')

exports.get = async(req, res, next) => {
  try {
    let list = await db.Room.find({ deleteAt: { $exists: false } })
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
    let id = res.locals.roomId || req.params.room_id
    let one = await db.Room.findById(id)
      .populate('price_id')
      .populate('user_id')
      .lean().exec()

    return res.status(200).json(one)
  } catch (err) {
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundRoom = await db.Room.findById(req.params.room_id)
    if (foundRoom) {
      if (req.body.softDelete) {
        await foundRoom.updateOne({ deleteAt: moment() })
      } else {
        await foundRoom.remove()
      }
      return res.status(200).json(foundRoom)
    }
    return next({
      status: 400,
      message: 'Room is not exist'
    })
  } catch (err) {
    return next(err)
  }
}
