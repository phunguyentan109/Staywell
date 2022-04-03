const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.role')


exports.create = tracker.handler('create', async(req, res) => {
  const createdRole = await services.roleService.create(req.body)
  return res.status(200).json(createdRole)
})
