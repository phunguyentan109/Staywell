const moment = require('moment')
const repo = require('../repositories')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('service.bill')

exports.get = tracker.seal('get', async () => {
  return repo.roomRepository.find({
    deleteAt: { $exists: false }
  })
})


exports.getDeleted = tracker.seal('getDeleted', async () => {
  return repo.roomRepository.find({ deleteAt: { $exists: true } })
})


exports.getOne = tracker.seal('getOne', async (roomId) => {
  return repo.roomRepository.findByIdLean(roomId)
})


exports.restore = tracker.seal('restore', async (room_id) => {
  return repo.roomRepository.findByIdAndUpdate(room_id, {
    $unset: { deleteAt: 1 }
  })
})


exports.remove = tracker.seal('remove', async ({ room_id, bodyReq }) => {
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
  return { status: 'fail' }
})


exports.assign = tracker.seal('assign', async (roomId, removeOne, newOne) => {
  let foundRoom = await repo.roomRepository.findOne({ _id: roomId })

  if (!foundRoom) return { error: 'No data found.' }

  await repo.roomRepository.clearIdFromUser(roomId, removeOne)

  let updateRoom = await repo.roomRepository.update({ _id: roomId }, { user_id: newOne })

  await repo.roomRepository.writeIdToUser(roomId, newOne)

  return { status: 'success', data: updateRoom }
})

