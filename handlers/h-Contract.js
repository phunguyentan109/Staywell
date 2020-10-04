const db = require('../models')
const _ = require('lodash')

exports.get = async(req, res, next) => {
  try {
    let { room_id } = req.params
    let contracts = await db.Contract
      .find({ room_id })
      .populate({
        path: 'room_id',
        select: 'user_id',
        populate: {
          path: 'user_id',
          select: '_id avatar'
        }
      })
      .exec()
    return res.status(200).json(contracts)
  } catch (e) {
    return next(e)
  }
}

exports.getLatestElectric = async(req, res, next) => {
  try {
    const { contract_id } = req.params

    // Get contract's information
    let { bill_id, info } = await db.Contract
      .findById(contract_id)
      .populate({
        path: 'bill_id',
        match: { electric: { $exists: true } }
      })
      .select('bill_id info.electric')
      .lean()
      .exec()

    if (!_.isEmpty(bill_id)) {
      // Get last electric number
      let electricNums = _.map(bill_id, b => b.electric.number)
      let highestNumber = Math.max(...electricNums)
      let foundBill = _.find(bill_id, b => b.electric.number === highestNumber)
      return res.status(200).json(foundBill.electric.number)
    } else {
      return res.status(200).json(info.electric)
    }
  } catch (e) {
    return next(e)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const contract_id = res.locals.contract_id || req.params.contract_id
    let foundContract = await db.Contract.findById(contract_id).populate('bill_id').exec()
    return res.status(200).json(foundContract)
  } catch (e) {
    return next(e)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let contract = await db.Contract.findById(req.params.contract_id)
    contract && await contract.remove()
    return res.status(200).json(contract)
  } catch (err) {
    return next(err)
  }
}
