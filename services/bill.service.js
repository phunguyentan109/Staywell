const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.bill')

exports.getOne = monitor.seal('getOne', async(bill_id) => {
  return await repo.billRepository.findByIdLean(bill_id)
})
