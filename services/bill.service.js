const repo = require('../repositories')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('service.bill')

exports.getOne = tracker.seal('getOne', async(bill_id) => {
  return await repo.billRepository.findByIdLean(bill_id)
})
