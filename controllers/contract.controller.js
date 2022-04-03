const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.contract')


exports.get = monitor.handler('get', async(req, res) => {
  const { filter, paging } = req.body
  const contracts = await services.contractService.get({ filter, paging })

  return res.status(200).json(monitor.response(contracts))
})


exports.getLatestElectric = monitor.handler('getLatestElectric', async(req, res) => {
  const { contract_id } = req.params
  const data = await services.contractService.getLatestElectric(contract_id)

  return res.status(200).json(monitor.response(data))
})


exports.getOne = monitor.handler('getOne', async(req, res) => {
  const contract_id = res.locals.contract_id || req.params.contract_id
  const foundContract = await services.contractService.getOne(contract_id)

  return res.status(200).json(monitor.response(foundContract))
})


exports.remove = monitor.handler('remove', async(req, res) => {
  let contract = await services.contractService.remove(req.params.contract_id)
  return res.status(200).json(monitor.response(contract))
})

