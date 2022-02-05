const moment = require('moment')
const repo = require('../repositories')

exports.get = async() => {
  try {
    return await repo.roomRepository.find({
      deleteAt: { $exists: false }
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.getDeleted = async() => {
  try {
    return await repo.roomRepository.find({ deleteAt: { $exists: true } })
  } catch (error) {
    throw new Error(error)
  }
}

exports.getOne = async(roomId) => {
  try {
    return await repo.roomRepository.findByIdLean(roomId)
  } catch (error) {
    throw new Error(error)
  }
}

exports.restore = async(room_id) => {
  try {
    return await repo.roomRepository.findByIdAndUpdate(room_id, {
      $unset: { deleteAt: 1 }
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.remove = async({ room_id, bodyReq }) => {
  try {
    let foundRoom = await repo.roomRepository.findById(room_id)
    if (foundRoom) {
      if (bodyReq.softDelete) {
        await foundRoom.updateOne({ deleteAt: moment() })
      } else {
        await foundRoom.remove()
      }
      return {
        status: 'success',
        data: foundRoom
      }
    }
    return {
      status: 'fail',
      data: foundRoom
    }
  } catch (error) {
    throw new Error(error)
  }
}