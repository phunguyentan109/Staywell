const db = require('../models')
const { genToken } = require('../utils/token')
const mail = require('../utils/mail')
const moment = require('moment')
const jwt = require('jsonwebtoken')

exports.signUp = async(req, res, next) => {
  try {
    let user = await db.User.create(req.body)
    let { email, username } = user

    // Mail user to confirm email
    await mail.confirmMail(req.header.host, { to: email, viewName: username, userId: user._id })

    return res.status(200).json({ email, username })
  } catch (err) {
    return next({
      status: 400,
      message: err.code === 11000 ? 'Sorry, that email/password is taken or invalid' : err.message
    })
  }
}

exports.logIn = async(req, res, next) => {
  try {
    let { email, password } = req.body
    email = email.includes('@') ? email :`${email}@gmail.com`

    let user = await db.User.findOne({ email })
    let { _id, username, avatar, anonymous } = user

    // compare password
    let match = await user.comparePassword(password)
    if (!match) return next({ status: 400, message: 'Invalid email/password.' })

    // get role of user
    let userRole = await db.UserRole.find({ user_id: _id }).populate('role_id').exec()
    let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false

    // get anonymous data
    let anonymousData = { tokens: [] }
    if (anonymous) {
      anonymousData.tokens = (await user.getAnonymous()).tokens
    }

    // gen token to store on client
    let token = genToken({ _id, role })

    return res.status(200).json({ _id, username, avatar, email, role, anonymous: anonymousData, token })
  } catch (err) {
    return next({ status: 400, message: 'Invalid email/password.' })
  }
}

exports.complete = async(req, res, next) => {
  try {
    let { user_id } = req.params
    console.log('go to here')
    let foundUser = await db.User.findById(user_id)
    if (!foundUser) return res.redirect('/')
    foundUser.isVerified = true
    await foundUser.save()
    res.locals.loadHtml = true
    return next()
  } catch (e) {
    return res.redirect('/')
  }
}

exports.openRegistration = async(req, res, next) => {
  try {
    let registrationToken = jwt.sign({ openAt: moment() }, process.env.SECRET, { expiresIn: '24h' })
    let foundUser = await db.User.findById(res.locals.loginUserId)
    if (foundUser) await foundUser.setAnonymousToken(registrationToken)
    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('handler => user.openRegistration')
    return next(e)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    let user = await db.User.findById(req.params.user_id)
    let { _id, username, email, avatar, anonymous } = user

    // get role
    let userRole = await db.UserRole.find({ user_id: _id }).populate('role_id').lean().exec()
    let role = userRole.length > 0 ? userRole.map(u => u.role_id) : false

    // get anonymous data
    let anonymousData = { tokens: [] }
    if (anonymous) {
      anonymousData.tokens = (await user.getAnonymous()).tokens
    }

    // gen token to store on client
    let token = genToken({ _id, role, anonymous: anonymousData })

    // return email and phone for updating profile
    return res.status(200).json({ _id, username, avatar, email, role, anonymous: anonymousData, token })
  } catch (err) {
    return next(err)
  }
}

exports.get = async(req, res, next) => {
  try {
    let people = await db.User
      .find({ password: { $exists: false } })
      .populate('room_id')
      .lean().exec()
    return res.status(200).json(people)
  } catch (err) {
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let user = await db.User.findById(req.params.user_id)
    if (user) user.remove()
    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}

exports.updatePassword = async(req, res, next) => {
  try {
    let user = await db.User.findById(req.params.user_id)

    // verify old password and change password
    let { current, change } = req.body
    let match = await user.comparePassword(current)
    if (match){
      user.password = change
      await user.save()

      //send change password mail
      mail.changePassword(user.email, user.username)
      return res.status(200).json(user)
    } else {
      // return error if old password is not matched
      return next({
        status: 400,
        message: 'Sorry, the password is invalid'
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.code === 11000 ? 'Sorry, the password is invalid' : err.message
    })
  }
}

exports.forgot = async(req, res, next) => {
  try {
    let { email } = req.body
    let foundUser = await db.User.findOne({ email })

    if (foundUser){
      let token = genToken(foundUser._id)
      foundUser.resetPwToken = token
      foundUser.resetPwExpires = Date.now() + 3600000 // 1 hour
      await foundUser.save()

      // send token to reset password
      mail.forgotPassword(foundUser.email, foundUser.username, token, req.headers.host)
      return res.status(200).json(token)
    } else {
      return next({
        status: 404,
        message: 'The email is not available.'
      })
    }
  } catch (err) {
    return next(err)
  }
}

exports.resetPassword = async(req, res, next) => {
  try {
    let { token } = req.params
    // find user by token and check timeout
    let foundUser = await db.User.findOne({
      resetPwToken: token,
      resetPwExpires: { $gt: Date.now() }
    })

    // return massage if not find any token in table user or the token has timeout
    if (!foundUser) {
      return next({
        status: 404,
        message: 'The token is invalid or timeout.'
      })
    }

    let { password } = req.body
    foundUser.password = password
    await foundUser.save()

    mail.changePassword(foundUser.email, foundUser.username)
    return res.status(200).json(token)
  } catch (err) {
    return next(err)
  }
}

exports.contact = async(req, res, next) => {
  try {
    let { title, content, user_id } = req.body
    let listUser = []

    // get user mail from user_id
    for (let id of user_id) {
      let user = await db.User.findById(id)
      let { email, username } = user
      listUser.push(username)
      mail.contactUser(email, username, content, title)
    }

    return res.status(200).json(listUser)
  } catch (err) {
    return next(err)
  }
}

exports.getAvailable = async(req, res, next) => {
  try {
    let foundPeople = await db.User.find({
      isVerified: true,
      password: { $exists: false },
      room_id: { $exists: false }
    }).lean().exec()

    return res.status(200).json(foundPeople)
  } catch (e) {
    return next(e)
  }
}

exports.update = async(req, res, next) => {
  try {
    let updateUser = await db.User.findByIdAndUpdate(req.params.user_id, req.body, { new: true })
    return res.status(200).json(updateUser)
  } catch (err) {
    return next(err)
  }
}
