const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.room')


exports.get = tracker.handler('get', async (req, res) => {
  let rooms = await services.roomService.get()
  return res.status(200).json(rooms)
})


exports.getDeleted = tracker.handler('getDeleted', async (req, res) => {
  let rooms = await services.roomService.getDeleted()
  return res.status(200).json(rooms)
})


exports.getOne = tracker.handler('getOne', async (req, res) => {
  const room_id = res.locals.roomId || req.params.room_id
  const room = await services.roomService.getOne(room_id)

  return res.status(200).json(room)
})


exports.restore = tracker.handler('restore', async (req, res) => {
  const restoreRoom = await services.roomService.restore(req.params.room_id)
  return res.status(200).json(restoreRoom)
})


exports.remove = tracker.handler('remove', async (req, res) => {
  let foundRoom = await services.roomService.remove({
    room_id: req.params.room_id,
    bodyReq: req.body
  })

  if (foundRoom.status !== 'success') throw tracker.wrap('Room is not exist')

  return res.status(200).json(foundRoom.data)
})


exports.assign = tracker.handler('assign', async (req, res) => {
  const { changes } = req.body
  const removeOne = changes.filter(u => u._remove).map(u => u._id)
  const newOne = changes.filter(u => !u._remove).map(u => u._id)

  const rs = await services.roomService.assign(req.params.roomId, removeOne, newOne)

  return res.status(200).json(rs)
})
