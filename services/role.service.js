const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.bill')


exports.create = monitor.seal('create', async (req) => {
  return repo.roleRepository.create(req)
})
