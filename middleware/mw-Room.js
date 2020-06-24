const db = require('../models')
const { pushId, spliceId, assignByIds } = require('../utils/dbSupport')
const { difference, forEach, cloneDeep } = require('lodash')
const { leaveRoom, getRoom } = require('../utils/mail')

exports.create = async(req, res, next) => {
  try {
    let createdRoom = await db.Room.create(req.body)
    const { price_id } = req.body

    // add room_id to price and user
    await pushId('Price', price_id, 'room_id', createdRoom._id)
    createdRoom = await createdRoom.save()
    res.locals.roomId = createdRoom._id

    return next()
  } catch (err) {
    return next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const { room_id } = req.params
    let { name, price_id } = req.body
    let foundRoom = await db.Room.findById(room_id)

    // update room
    foundRoom.name = name
    if (foundRoom.price_id && !foundRoom.price_id.equals(price_id)) {
      await spliceId('Price', foundRoom.price_id, 'room_id', foundRoom._id)
    }
    if (price_id) {
      foundRoom.price_id = price_id
      await pushId('Price', price_id, 'room_id', foundRoom._id)
    }
    await foundRoom.save()

    return next()
  } catch (e) {
    return next(e)
  }
}

exports.assign = async(req, res, next) => {
  try {
    const { room_id } = req.params
    let inputUserIds = cloneDeep(req.body.user_id)
    let foundRoom = await db.Room.findByIdAndUpdate(room_id, { user_id: inputUserIds })

    // determine old people and current user
    let oldUserIds = difference(foundRoom.user_id, inputUserIds)
    let newUserIds = difference(inputUserIds, foundRoom.user_id)

    // remove room id from old user data
    await assignByIds('User', oldUserIds, { room_id: undefined })
    let oldUsers = await db.User.find({ _id: { $in: oldUserIds } }).lean().exec()
    forEach(oldUsers, ({ email, username }) => leaveRoom(email, username, foundRoom.name))

    // assign room id for new people
    await assignByIds('User', newUserIds, { room_id: foundRoom._id })
    let newUsers = await db.User.find({ _id: { $in: newUserIds } }).lean().exec()
    forEach(newUsers, ({ email, username }) => getRoom(email, username, foundRoom.name))

    return next()
  } catch (e) {
    return next(e)
  }
}
