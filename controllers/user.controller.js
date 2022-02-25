const services = require('../services')
const { controllerLogger } = require('../utils/logger')

exports.signUp = async(req, res, next) => {
  try {
    const { body, header: { host } } = req
    const signUpVal = await services.userService.signUp(body, host)
    const { email, username } = signUpVal

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
    const loginVal = await services.userService.logIn(req.body)
    const { _id, username, avatar, email, role, anonymousData, token, errMessage, status } = loginVal
    if (errMessage || status === 'fail') {
      return next({
        status: 400,
        message: errMessage
      })
    }

    return res.status(200).json({ _id, username, avatar, email, role, anonymous: anonymousData, token })
  } catch (err) {
    controllerLogger('user.logIn', err.message)
    return next({ status: 400, message: 'Invalid email/password.' })
  }
}

exports.complete = async(req, res, next) => {
  try {
    let { user_id } = req.params
    const completeVal = await services.userService.complete(user_id)
    if (completeVal.status === 'fail') {
      return res.redirect('/')
    }
    res.locals.loadHtml = true

    return next()
  } catch (err) {
    controllerLogger('user.complete', err.message)
    return res.redirect('/')
  }
}

exports.openRegistration = async(req, res, next) => {
  try {
    const openRegistrationVal = await services.userService.openRegistration(res.locals.loginUserId)
    if (!openRegistrationVal) {
      return next()
    }
    return res.status(200).json({ success: true })
  } catch (err) {
    controllerLogger('user.openRegistration', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const user = await services.userService.getOne((req.params.user_id))
    // return email and phone for updating profile
    return res.status(200).json({ ...user, anonymous: user.anonymousData })
  } catch (err) {
    controllerLogger('user.getOne', err.message)
    return next(err)
  }
}

exports.get = async(req, res, next) => {
  try {
    const people = await services.userService.get()
    return res.status(200).json(people)
  } catch (err) {
    controllerLogger('user.get', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    const user = await services.userService.remove(req.params.user_id)
    return res.status(200).json(user)
  } catch (err) {
    controllerLogger('user.remove', err.message)
    return next(err)
  }
}

exports.updatePassword = async(req, res, next) => {
  try {
    const { current, change } = req.body
    const updatePasswordVal = await services.userService.updatePassword({
      user_id: req.params.user_id,
      current,
      change
    })

    if (updatePasswordVal.data){
      return res.status(200).json(updatePasswordVal.data)
    } else {
      // return error if old password is not matched
      return next({
        status: 400,
        message: 'Sorry, the password is invalid'
      })
    }
  } catch (err) {
    controllerLogger('user.updatePassword', err.message)
    return next({
      status: 400,
      message: err.code === 11000 ? 'Sorry, the password is invalid' : err.message
    })
  }
}

exports.forgot = async(req, res, next) => {
  try {
    const { email } = req.body
    const { host } = req.headers
    let foundUser = await services.userService.forgot({ email, host })

    if (foundUser.token){
      return res.status(200).json(foundUser.token)
    }
    return next({
      status: 404,
      message: 'The email is not available.'
    })
  } catch (err) {
    controllerLogger('user.forgot', err.message)
    return next(err)
  }
}

exports.resetPassword = async(req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // find user by token and check timeout
    const foundUser = await services.userService.resetPassword({ token, password })
    // return massage if not find any token in table user or the token has timeout
    if (!foundUser) {
      return next({
        status: 404,
        message: 'The token is invalid or timeout.'
      })
    }

    return res.status(200).json(foundUser.token)
  } catch (err) {
    controllerLogger('user.resetPassword', err.message)
    return next(err)
  }
}

exports.contact = async(req, res, next) => {
  try {
    let { title, content, user_id } = req.body
    let listUser = await services.userService.contact({ title, content, user_id })
    return res.status(200).json(listUser.data)
  } catch (err) {
    controllerLogger('user.contact', err.message)
    return next(err)
  }
}

exports.getAvailable = async(req, res, next) => {
  try {
    const foundPeople = await services.userService.getAvailable()
    return res.status(200).json(foundPeople.data)
  } catch (err) {
    controllerLogger('user.getAvailable', err.message)
    return next(err)
  }
}

exports.update = async(req, res, next) => {
  try {
    const updateUser = await services.userService.update({
      user_id: req.params.user_id,
      dataReq: req.body
    })
    return res.status(200).json(updateUser.data)
  } catch (err) {
    controllerLogger('user.update', err.message)
    return next(err)
  }
}
