const moment = require('moment')
const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.bill')

exports.get = monitor.seal('get', async () => {
  const query = {
    deleteAt: { $exists: false }
  }

  const populates = [
    { path: 'userIds' },
    { path: 'priceId' }
  ]

  return repo.roomRepository.find(query, populates)
})


exports.getDeleted = monitor.seal('getDeleted', async () => {
  return repo.roomRepository.find({ deleteAt: { $exists: true } })
})


exports.getOne = monitor.seal('getOne', async (roomId) => {
  return repo.roomRepository.findByIdLean(roomId)
})


exports.restore = monitor.seal('restore', async (roomId) => {
  return repo.roomRepository.findByIdAndUpdate(roomId, {
    $unset: { deleteAt: 1 }
  })
})


exports.remove = monitor.seal('remove', async ({ roomId, bodyReq }) => {
  let foundRoom = await repo.roomRepository.findById(roomId)
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


exports.assign = monitor.seal('assign', async (roomId, removeOne, newOne) => {
  let foundRoom = await repo.roomRepository.findOne({ _id: roomId })

  if (!foundRoom) return { error: 'No data found.' }

  await repo.roomRepository.clearIdFromUser(roomId, removeOne)

  let updateRoom = await repo.roomRepository.update({ _id: roomId }, { userIds: newOne })

  await repo.roomRepository.writeIdToUser(roomId, newOne)

  return { status: 'success', data: updateRoom }
})

