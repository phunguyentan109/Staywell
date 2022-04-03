const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.price')


exports.get = monitor.handler('get', async(req, res) => {
  let prices = await services.priceService.get()
  return res.status(200).json(monitor.response(prices))
})


exports.getDeleted = monitor.handler('getDeleted', async(req, res) => {
  let prices = await services.priceService.getDeleted()
  return res.status(200).json(monitor.response(prices))
})


exports.getOne = async(req, res) => {
  let price = await services.priceService.getOne(req.params.price_id)
  return res.status(200).json(monitor.response(price))
}


exports.create = async(req, res) => {
  let newPrice = await services.priceService.create(req.body)
  return res.status(200).json(monitor.response(newPrice))
}


exports.remove = monitor.handler('remove', async(req, res) => {
  let foundPrice = await services.priceService.remove({
    price_id: req.params.price_id,
    bodyReq: req.body
  })

  if (foundPrice.status !== 'success') throw monitor.wrap('Price is not exist')

  return res.status(200).json(monitor.response(foundPrice.data))
})


exports.restore = async(req, res) => {
  let restorePrice = await services.priceService.restore(req.params.price_id)
  return res.status(200).json(monitor.response(restorePrice))
}


exports.update = async(req, res) => {
  let updatedPrice = await services.priceService.update({
    price_id: req.params.price_id,
    bodyReq: req.body
  })
  return res.status(200).json(monitor.response(updatedPrice))
}
