const services = require('../services')
const { hdLog } = require('../utils/logger')

exports.get = async(req, res, next) => {
  try {
    let prices = await services.priceService.get()
    return res.status(200).json(prices)
  } catch (err){
    hdLog('price.get', err.message)
    return next(err)
  }
}

exports.getDeleted = async(req, res, next) => {
  try {
    let prices = await services.priceService.getDeleted()
    return res.status(200).json(prices)
  } catch (err){
    hdLog('price.getDeleted', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    let price = await services.priceService.getOne(req.params.price_id)
    return res.status(200).json(price)
  } catch (err){
    hdLog('price.getOne', err.message)
    return next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    let newPrice = await services.priceService.create(req.body)
    return res.status(200).json(newPrice)
  } catch (err) {
    hdLog('price.create', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundPrice = await services.priceService.remove({
      price_id: req.params.price_id, 
      bodyReq: req.body
    })
    if (foundPrice.status === 'success') {
      return res.status(200).json(foundPrice.data)
    }
    return next({
      status: 400,
      message: 'Price is not exist'
    })
  } catch (err) {
    hdLog('price.remove', err.message)
    return next(err)
  }
}

exports.restore = async(req, res, next) => {
  try {
    let restorePrice = await services.priceService.restore(req.params.price_id)
    return res.status(200).json(restorePrice)
  } catch (err) {
    hdLog('price.restore', err.message)
    return next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    let updatedPrice = await services.priceService.update({
      price_id: req.params.price_id,
      bodyReq: req.body
    })
    return res.status(200).json(updatedPrice)
  } catch (err) {
    hdLog('price.update', err.message)
    return next(err)
  }
}