const { redisService } = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.redis')


exports.getRegistrationTokens = monitor.handler('getRegistrationTokens', async(req, res) => {
  const rs = await redisService.getRegistrationTokens()
  return res.status(200).json(monitor.response(rs || []))
})


exports.newRegistrationToken = monitor.handler('newRegistrationToken', async(req, res) => {
  const rs = await redisService.newRegistrationToken()
  return res.status(200).json(monitor.response(rs))
})


exports.submitRegistrationToken = monitor.handler('submitRegistrationToken', async(req, res) => {
  const rs = await redisService.submitRegistrationToken(req.params.token, req.body)
  return res.status(200).json(monitor.response(rs))
})


exports.removeRegistrationToken = monitor.handler('removeRegistrationToken', async(req, res) => {
  const rs = await redisService.removeRegistrationToken(req.params.token)
  return res.status(200).json(monitor.response(rs))
})

