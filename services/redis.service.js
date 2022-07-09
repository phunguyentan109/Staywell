const crypto = require('crypto')
const moment = require('moment')
const Monitor = require('../utils/shield')
const repo = require('../repositories')
// const mail = require('../utils/mail')

const monitor = new Monitor('service.user')
const registerPrefix = 'regtr_'

const defaultAvatar = {
  'sex': 'man',
  'faceColor': '#F9C9B6',
  'earSize': 'small',
  'eyeStyle': 'oval',
  'noseStyle': 'short',
  'mouthStyle': 'smile',
  'shirtStyle': 'hoody',
  'glassesStyle': 'none',
  'hairColor': '#000',
  'hairStyle': 'normal',
  'hatStyle': 'beanie',
  'hatColor': '#D2EFF3',
  'eyeBrowStyle': 'up',
  'shirtColor': '#595959',
  'bgColor': 'linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)'
}


const getRegTokenName = token => `${registerPrefix}${token.slice(token.length - 4, token.length)}`


exports.getRegistrationTokens = monitor.seal('getRegistrationTokens', async () => {
  let allTokens = await repo.redisRepository.getAll(registerPrefix)

  return allTokens.map(item => ({
    ...item,
    token: item.token.substring(item.token.length - 10, item.token.length),
  }))
})


exports.newRegistrationToken = monitor.seal('newRegistrationToken', async () => {
  let token = crypto.randomUUID()

  let name = getRegTokenName(token)
  let expireTime = moment().add(1, 'days').unix()

  let value = { token, expireTime }

  await repo.redisRepository.expireSet(name, value, expireTime)

  return value
})


exports.submitRegistrationToken = monitor.seal('submitRegistrationToken', async (token, data) => {
  let isValidToken = await repo.redisRepository.exist(getRegTokenName(token))
  if (!isValidToken) return monitor.wrap('Invalid token.')

  let newUser = await repo.userRepository.create({ ...data, avatar: defaultAvatar })

  // await mail.confirmMail({ to: data.email, viewName: data.username, userId: newUser._id })

  // Remove the token
  await exports.removeRegistrationToken(token)

  return { success: true }
})


exports.removeRegistrationToken = monitor.seal('removeRegistrationToken', async (token) => {
  let isExist = await repo.redisRepository.exist(getRegTokenName(token))
  if (!isExist) return monitor.wrap('Token had been expired or invalid.')

  await repo.redisRepository.remove(getRegTokenName(token))

  return { removed: 'success' }
})
