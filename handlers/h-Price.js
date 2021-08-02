const moment = require('moment')
const db = require('../models')
const { hdLog } = require('../utils/logger')

exports.get = async(req, res, next) => {
  try {
    let prices = await db.Price.find({ deleteAt: { $exists: false } }).select('-room_id')
    return res.status(200).json(prices)
  } catch (err){
    hdLog('price.get', err.message)
    return next(err)
  }
}

exports.getDeleted = async(req, res, next) => {
  try {
    let prices = await db.Price.find({ deleteAt: { $exists: true } }).select('-room_id')
    return res.status(200).json(prices)
  } catch (err){
    hdLog('price.getDeleted', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    let price = await db.Price.findById({ _id: req.params.price_id })
    return res.status(200).json(price)
  } catch (err){
    hdLog('price.getOne', err.message)
    return next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    let newPrice = await db.Price.create(req.body)
    return res.status(200).json(newPrice)
  } catch (err) {
    hdLog('price.create', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundPrice = await db.Price.findById({ _id: req.params.price_id })
    if (foundPrice) {
      if (req.body.softDelete) {
        await foundPrice.updateOne({ deleteAt: moment() })
      } else {
        await foundPrice.remove()
      }
      return res.status(200).json(foundPrice)
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
    let restorePrice = await db.Price.findByIdAndUpdate(req.params.price_id, {
      $unset: { deleteAt: 1 }
    }, { new: true })
    return res.status(200).json(restorePrice)
  } catch (err) {
    hdLog('price.restore', err.message)
    return next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    let updatedPrice = await db.Price.findByIdAndUpdate(req.params.price_id, req.body, { new: true })
    return res.status(200).json(updatedPrice)
  } catch (err) {
    hdLog('price.update', err.message)
    return next(err)
  }
}
