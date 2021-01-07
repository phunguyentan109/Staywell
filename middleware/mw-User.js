const jwt = require('jsonwebtoken')
const rs = require('request')
const db = require('../models')

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
    return next()
  }
}

exports.disableToken = async(req, res, next) => {
  try {
    if (!res.locals.registerToken.allow) return next()
    let foundUser = await db.User.findOne({ email: process.env.GMAIL_USER }).exec()

    // Remove token from user anonymous data
    if (foundUser && foundUser.anonymous) {
      let { tokens } = foundUser.anonymous
      tokens = tokens.filter(t => t !== req.params.token)
      foundUser.anonymous = { tokens }
      await foundUser.save()
    }
    res.locals.registerToken = { allow: false, expiredAt: 'Invalid token' }
    return next()
  } catch (e) {
    return next(e)
  }
}
