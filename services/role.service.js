const repo = require('../repositories')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('service.bill')


exports.create = tracker.seal('create', async (req) => {
  return repo.roleRepository.create(req)
})
