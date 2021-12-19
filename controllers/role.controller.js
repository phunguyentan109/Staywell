const services = require('../services')

exports.create = async(req, res, next) => {
  try {
    const createdRole = await services.roleService.create(req.body)
    return res.status(200).json(createdRole)
  } catch (err){
    return res.send(err)
  }
}