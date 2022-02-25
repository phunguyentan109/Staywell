const moment = require('moment')
const repo = require('../repositories')
const { serviceLogger } = require('../utils/logger')

exports.get = async() => {
  try {
    return await repo.priceRepository.find({ deleteAt: { $exists: false } }, '-room_id')
  } catch (error) {
    serviceLogger('price.get', error)
    throw new Error(error)
  }
}

exports.getDeleted = async() => {
  try {
    return await repo.priceRepository.find({ deleteAt: { $exists: true } }, '-room_id')
  } catch (error) {
    serviceLogger('price.getDeleted', error.message)
    throw new Error(error)
  }
}

exports.getOne = async(price_id) => {
  try {
    return await repo.priceRepository.findById(price_id)
  } catch (error) {
    serviceLogger('price.getOne', error.message)
    throw new Error(error)
  }
}

exports.create = async(req) => {
  try {
    return await repo.priceRepository.create(req)
  } catch (error) {
    serviceLogger('price.create', error.message)
    throw new Error(error)
  }
}

exports.remove = async({ price_id, bodyReq }) => {
  try {
    let foundPrice = await repo.priceRepository.findById(price_id)
    if (foundPrice) {
      if (bodyReq.softDelete) {
        await foundPrice.updateOne({ deleteAt: moment() })
      } else {
        await foundPrice.remove()
      }
      return {
        status: 'success',
        data: foundPrice
      }
    }
    return {
      status: 'fail',
      data: foundPrice
    }
  } catch (error) {
    serviceLogger('price.remove', error.message)
    throw new Error(error)
  }
}

exports.restore = async(price_id) => {
  try {
    return await repo.priceRepository.findByIdAndUpdate(price_id, {
      $unset: { deleteAt: 1 }
    })
  } catch (error) {
    serviceLogger('price.restore', error.message)
    throw new Error(error)
  }
}

exports.update = async({ price_id, bodyReq }) => {
  try {
    return await repo.priceRepository.findByIdAndUpdate(price_id, bodyReq)
  } catch (error) {
    serviceLogger('price.update', error.message)
    throw new Error(error)
  }
}
