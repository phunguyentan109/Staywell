const db = require('../models')
const { pushId, spliceId, assignId } = require('../utils/dbSupport')
const mail = require('../utils/mail')

exports.update = async(req, res, next) => {
  try {
    const { room_id } = req.params
    let { name, price_id } = req.body
    let foundRoom = await db.Room.findById(room_id)

    // update room
    foundRoom.name = name
    if(foundRoom.price_id && !foundRoom.price_id.equals(price_id)) {
      await spliceId('Price', foundRoom.price_id, 'room_id', foundRoom._id)
    }
    if(price_id) {
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
    let foundRoom = await db.Room.findById(room_id).populate('price_id').exec()

    // Get only the id of user
    let user_id = req.body.user_id.map(user => user._id)

    // determine old people and current user
    let newUser = [], oldUser = [], curUser = []
    for(let id of foundRoom.user_id) {
      let isExist = user_id.some(uid => id.equals(uid))
      if(isExist) curUser.push(id)
      else oldUser.push(id)
    }

    // determine new user
    for(let uid of user_id) {
      let isExist = foundRoom.user_id.some(id => id.equals(uid))
      if(!isExist) newUser.push(uid)
    }

    // remove room id of old user
    if(oldUser.length > 0) {
      for(let id of oldUser) {
        await assignId('User', id, 'room_id')

        // send mail to notify user about removing from the room
        let foundUser = await db.User.findById(id).lean().exec()
        let { email, username } = foundUser
        mail.leaveRoom(email, username, foundRoom.name)
      }
    }

    // assign room id for new people
    if(newUser.length > 0) {
      for(let id of newUser) {
        await assignId('User', id, 'room_id', foundRoom._id)

        // send mail to notify people about new place
        let foundUser = await db.User.findById(id).lean().exec()
        let { email, username } = foundUser
        mail.getRoom(email, username, foundRoom.name)
      }
    }

    foundRoom.user_id = [...curUser, ...newUser]
    foundRoom = await foundRoom.save()

    return res.status(200).json(foundRoom)
  } catch (e) {
    return next(e)
  }
}
