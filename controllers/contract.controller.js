const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.contract')


exports.get = tracker.handler('get', async(req, res) => {
  const { filter, paging } = req.body
  const contracts = await services.contractService.get({ filter, paging })

  return res.status(200).json(contracts)
})


exports.getLatestElectric = tracker.handler('getLatestElectric', async(req, res) => {
  const { contract_id } = req.params
  const data = await services.contractService.getLatestElectric(contract_id)

  return res.status(200).json(data)
})


exports.getOne = tracker.handler('getOne', async(req, res) => {
  const contract_id = res.locals.contract_id || req.params.contract_id
  const foundContract = await services.contractService.getOne(contract_id)

  return res.status(200).json(foundContract)
})


exports.remove = tracker.handler('remove', async(req, res) => {
  let contract = await services.contractService.remove(req.params.contract_id)
  return res.status(200).json(contract)
})

