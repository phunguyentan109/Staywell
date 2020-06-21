const db = require('../models')

exports.get = async(req, res, next) => {
  try{
    let prices = await db.Price.find().select('-room_id')
    return res.status(200).json(prices)
  } catch(err){
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try{
    let price = await db.Price.findById({ _id: req.params.price_id })
    return res.status(200).json(price)
  } catch (err){
    return next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    console.log(req.body)
    let newPrice = await db.Price.create(req.body)
    return res.status(200).json(newPrice)
  } catch (err) {
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundPrice = await db.Price.findById({ _id: req.params.price_id })
    if(foundPrice) foundPrice.remove()
    return res.status(200).json(foundPrice)
  } catch(err) {
    return next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    let updatedPrice = await db.Price.findByIdAndUpdate(req.params.price_id, req.body, { new: true })
    return res.status(200).json(updatedPrice)
  } catch(err) {
    return next(err)
  }
}
