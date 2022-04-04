const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.role')


exports.create = monitor.handler('create', async(req, res) => {
  const createdRole = await services.roleService.create(req.body)
  return res.status(200).json(monitor.response(createdRole))
})
