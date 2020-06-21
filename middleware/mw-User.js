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

exports.getByRole = async(req, res, next) => {
  try {
    let all = await db.UserRole.find().populate('role_id').lean().exec()
    let peopleData = all.filter(u => u.role_id.code === '001')
    let ownerData = all.filter(u => u.role_id.code === '000')[0]
    res.locals = {
      peopleIds: peopleData.map(p => p.user_id),
      ownerId: ownerData.user_id
    }
    return next()
  } catch (e) {
    return next(e)
  }
}

exports.isLogin = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = await jwt.verify(token, process.env.SECRET)
    if (payload) return next()
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
    return isPermit ? next() : next({
      status: 405,
      message: 'Action is not permitted!'
    })
  } catch (err) {
    return next(err)
  }
}
