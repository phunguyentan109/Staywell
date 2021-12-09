const services = require('../services')
const { hdLog } = require('../utils/logger')

exports.get = async(req, res, next) => {
  try {
    // prepare query
    const { filter, paging } = req.body
    const contracts = await services.contractService.get({ filter, paging })
    return res.status(200).json(contracts)
  } catch (err) {
    hdLog('contract.get', err.message)
    return next(err)
  }
}

exports.getLatestElectric = async(req, res, next) => {
  try {
    const { contract_id } = req.params
    const data = await services.contractService.getLatestElectric(contract_id)
    return res.status(200).json(data)
  } catch (err) {
    hdLog('contract.getLatestElectric', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const contract_id = res.locals.contract_id || req.params.contract_id
    const foundContract = await services.contractService.getOne(contract_id)
    return res.status(200).json(foundContract)
  } catch (err) {
    hdLog('contract.getOne', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let contract = await services.contractService.remove(req.params.contract_id)
    return res.status(200).json(contract)
  } catch (err) {
    hdLog('contract.remove', err.message)
    return next(err)
  }
}
