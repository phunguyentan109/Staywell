const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.price')


exports.get = tracker.handler('get', async(req, res) => {
  let prices = await services.priceService.get()
  return res.status(200).json(prices)
})


exports.getDeleted = tracker.handler('getDeleted', async(req, res) => {
  let prices = await services.priceService.getDeleted()
  return res.status(200).json(prices)
})


exports.getOne = async(req, res) => {
  let price = await services.priceService.getOne(req.params.price_id)
  return res.status(200).json(price)
}


exports.create = async(req, res) => {
  let newPrice = await services.priceService.create(req.body)
  return res.status(200).json(newPrice)
}


exports.remove = tracker.handler('remove', async(req, res) => {
  let foundPrice = await services.priceService.remove({
    price_id: req.params.price_id,
    bodyReq: req.body
  })

  if (foundPrice.status !== 'success') throw tracker.wrap('Price is not exist')

  return res.status(200).json(foundPrice.data)
})


exports.restore = async(req, res) => {
  let restorePrice = await services.priceService.restore(req.params.price_id)
  return res.status(200).json(restorePrice)
}


exports.update = async(req, res) => {
  let updatedPrice = await services.priceService.update({
    price_id: req.params.price_id,
    bodyReq: req.body
  })
  return res.status(200).json(updatedPrice)
}
