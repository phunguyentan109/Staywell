const jwt = require('jsonwebtoken')
const rs = require('request')
const db = require('../models')
const { mwLog } = require('../utils/logger')

exports.generateAvatar = (req, res, next) => {
  const url = 'https://source.unsplash.com/random'
  rs(url, (request, response) => {
    req.body.avatar = {
      link: `https://images.unsplash.com${response.request.path}`
    }
    return next()
  })
}

exports.isLogin = async(req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const payload = await jwt.verify(token, process.env.SECRET)
      if (payload) return next()
    }
    return next({ status: 401, message: 'Please login first!' })
  } catch (err) {
    mwLog('user.isLogin', err.message)
    return next(err)
  }
}

exports.isCorrect = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = await jwt.verify(token, process.env.SECRET)
    if (payload && payload._id === req.params.user_id) return next()
    return next({ status: 401, message: 'Unauthorized!' })
  } catch (err) {
    mwLog('user.isCorrect', err.message)
    return next(err)
  }
}

exports.isPermit = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = await jwt.verify(token, process.env.SECRET)

    let { role } = payload
    let isPermit = role.map(r => r.code).indexOf('000') !== -1
    if (!isPermit) return next({ status: 405, message: 'Action is not permitted!' })

    res.locals.loginUserId = payload._id
    return next()
  } catch (err) {
    mwLog('user.isPermit', err.message)
    return next(err)
  }
}

exports.isValidRegisterToken = async(req, res, next) => {
  try {
    await jwt.verify(req.params.token, process.env.SECRET)

    let foundUser = await db.User.findOne({ email: process.env.GMAIL_USER }).exec()
    const { anonymous } = foundUser
    if (anonymous && anonymous.tokens) {
      res.locals.isValidToken = !anonymous.usedTokens.some(t => t === req.params.token)
    }

    return next()
  } catch (err) {
    res.locals.isValidToken = false
    mwLog('user.isValidRegisterToken', err.message)
    return next()
  }
}

exports.disableToken = async(req, res, next) => {
  try {
    if (!res.locals.isValidToken) return next()
    let owner = await db.User.findById(res.locals.loginUserId)
    await owner.setAnonymousToken(req.params.token, 'usedTokens')
    return next()
  } catch (e) {
    mwLog('disableToken', err.message)
    return next(e)
  }
}
