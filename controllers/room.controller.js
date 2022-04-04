const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.room')


exports.get = monitor.handler('get', async (req, res) => {
  let rooms = await services.roomService.get()
  return res.status(200).json(monitor.response(rooms))
})


exports.getDeleted = monitor.handler('getDeleted', async (req, res) => {
  let rooms = await services.roomService.getDeleted()
  return res.status(200).json(monitor.response(rooms))
})


exports.getOne = monitor.handler('getOne', async (req, res) => {
  const room_id = res.locals.roomId || req.params.room_id
  const room = await services.roomService.getOne(room_id)

  return res.status(200).json(monitor.response(room))
})


exports.restore = monitor.handler('restore', async (req, res) => {
  const restoreRoom = await services.roomService.restore(req.params.room_id)
  return res.status(200).json(monitor.response(restoreRoom))
})


exports.remove = monitor.handler('remove', async (req, res) => {
  let foundRoom = await services.roomService.remove({
    room_id: req.params.room_id,
    bodyReq: req.body
  })

  if (foundRoom.status !== 'success') throw monitor.wrap('Room is not exist')

  return res.status(200).json(monitor.response(foundRoom.data))
})


exports.assign = monitor.handler('assign', async (req, res) => {
  const { changes } = req.body
  const removeOne = changes.filter(u => u._remove).map(u => u._id)
  const newOne = changes.filter(u => !u._remove).map(u => u._id)

  const rs = await services.roomService.assign(req.params.roomId, removeOne, newOne)

  return res.status(200).json(monitor.response(rs))
})
