const { redisService } = require('../services')
const Monitor = require('../utils/shield')
const { VALIDATE_ERRORS } = require('../utils/const')

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
  const requireKeys = ['email', 'password', 'avatar']

  if (requireKeys.some(k => !req.body[k])) return monitor.wrap('Required data missing')

  const rs = await redisService.submitRegistrationToken(req.params.token, req.body)
  return res.status(200).json(monitor.response(rs))
}, {
  onCatch: (err, res, next) => {
    if (err.dbValidateErr === VALIDATE_ERRORS.duplicate) {
      err.logicError = 'This email has been used. Please try a different one.'
    }
    return next(err)
  }
})


exports.removeRegistrationToken = monitor.handler('removeRegistrationToken', async(req, res) => {
  const rs = await redisService.removeRegistrationToken(req.params.token)
  return res.status(200).json(monitor.response(rs))
})

