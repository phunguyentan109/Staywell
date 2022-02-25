const services = require('../services')
const { controllerLogger } = require('../utils/logger')

exports.get = async(req, res, next) => {
  try {
    let rooms = await services.roomService.get()
    return res.status(200).json(rooms)
  } catch (err){
    controllerLogger('room.get', err.message)
    return next(err)
  }
}

exports.getDeleted = async(req, res, next) => {
  try {
    let rooms = await services.roomService.getDeleted()
    return res.status(200).json(rooms)
  } catch (err){
    controllerLogger('room.getDeleted', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const room_id = res.locals.roomId || req.params.room_id
    const room = await services.roomService.getOne(room_id)
    return res.status(200).json(room)
  } catch (err){
    controllerLogger('room.getOne', err.message)
    return next(err)
  }
}

exports.restore = async(req, res, next) => {
  try {
    const restoreRoom = await services.roomService.restore(req.params.room_id)
    return res.status(200).json(restoreRoom)
  } catch (err) {
    controllerLogger('room.restore', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundRoom = await services.roomService.remove({
      room_id: req.params.room_id,
      bodyReq: req.body
    })
    if (foundRoom.status === 'success') {
      return res.status(200).json(foundRoom.data)
    }
    return next({
      status: 400,
      message: 'Room is not exist'
    })
  } catch (err) {
    controllerLogger('room.remove', err.message)
    return next(err)
  }
}

exports.assign = async(req, res, next) => {
  try {
    const { changes } = req.body
    const removeOne = changes.filter(u => u._remove).map(u => u._id)
    const newOne = changes.filter(u => !u._remove).map(u => u._id)

    const rs = await services.roomService.assign(req.params.roomId, removeOne, newOne)
    return res.status(200).json(rs)
  } catch (e) {
    controllerLogger('room.assign', e.message)
    return next(e)
  }
}
