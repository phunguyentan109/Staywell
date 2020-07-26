const db = require('../models')

exports.get = async(req, res, next) => {
  try {
    let { room_id } = req.params
    let contracts = await db.Contract.find({ room_id }).populate('bill_id').exec()
    return res.status(200).json(contracts)
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
