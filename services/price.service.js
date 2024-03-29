const moment = require('moment')
const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.bill')


exports.get = monitor.seal('', async () => {
  return repo.priceRepository.find({ deleteAt: { $exists: false } }, '-room_id')
})


exports.getDeleted = monitor.seal('getDeleted', async () => {
  return repo.priceRepository.find({ deleteAt: { $exists: true } }, '-room_id')
})


exports.getOne = monitor.seal('getOne', async (price_id) => {
  return repo.priceRepository.findById(price_id)
})


exports.create = monitor.seal('create', async (req) => {
  return repo.priceRepository.create(req)
})


exports.remove = monitor.seal('remove', async ({ price_id, bodyReq }) => {
  let foundPrice = await repo.priceRepository.findById(price_id)

  if (foundPrice) {
    if (bodyReq.softDelete) {
      await foundPrice.updateOne({ deleteAt: moment() })
    } else {
      await foundPrice.remove()
    }
    return { status: 'success', data: foundPrice }
  }

  return { status: 'fail', data: foundPrice }
})


exports.restore = monitor.seal('restore', async (price_id) => {
  return repo.priceRepository.findByIdAndUpdate(price_id, {
    $unset: { deleteAt: 1 }
  })
})


exports.update = monitor.seal('update', async ({ price_id, bodyReq }) => {
  return repo.priceRepository.findByIdAndUpdate(price_id, bodyReq)
})

