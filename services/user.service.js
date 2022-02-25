const moment = require('moment')
const jwt = require('jsonwebtoken')
const repo = require('../repositories')
const { serviceLogger } = require('../utils/logger')
const mail = require('../utils/mail')
const { genToken } = require('../utils/token')

exports.signUp = async(body, host) => {
  try {
    const user = await repo.userRepository.create(body)
    const { email, username, _id } = user

    // Mail user to confirm email
    await mail.confirmMail(host, { to: email, viewName: username, userId: _id })

    return user
  } catch (error) {
    serviceLogger('user.signUp', error.message)
    throw new Error(error)
  }
}

exports.logIn = async(req) => {
  try {
    let { email, password } = req
    email = email.includes('@') ? email :`${email}@gmail.com`

    const user = await repo.userRepository.findOne({ email })

    const { _id, username, avatar, anonymous } = user

    // compare password
    const match = await user.comparePassword(password)
    if (!match) return ({
      status: 'fail',
      errMessage: 'Invalid email/password.'
    })

    // get role of user
    const userRole = await repo.userRepository.findUserRole({ user_id: _id })

    const role = userRole.length > 0 ? userRole.map(u => u.role_id) : false

    // get anonymous data
    let anonymousData = { tokens: [] }
    if (anonymous) {
      anonymousData.tokens = (await user.getAnonymous()).tokens
    }

    // gen token to store on client
    const token = genToken({ _id, role })

    return { _id, username, avatar, email, role, anonymousData, token }
  } catch (error) {
    serviceLogger('user.logIn', error.message)
    throw new Error(error)
  }
}

exports.complete = async(userId) => {
  try {
    let foundUser = await repo.userRepository.findById(userId)
    if (!foundUser) {
      return { status: 'fail' }
    }
    foundUser.isVerified = true
    await foundUser.save()
    return { status: 'success' }
  } catch (error) {
    serviceLogger('user.complete', error.message)
    throw new Error(error)
  }
}

exports.openRegistration = async(loginUserId) => {
  try {
    const registrationToken = jwt.sign({ openAt: moment() }, process.env.SECRET, { expiresIn: '24h' })
    let foundUser = await repo.userRepository.findById(loginUserId)
    if (foundUser) await foundUser.setAnonymousToken(registrationToken)
    return foundUser
  } catch (error) {
    serviceLogger('user.openRegistration', error.message)
    throw new Error(error)
  }
}

exports.getOne = async(userId) => {
  try {
    const user = await repo.userRepository.findById(userId)

    let { _id, username, email, avatar, anonymous } = user

    // get role
    const userRole = await repo.userRepository.findUserRole({ user_id: _id })
    const role = userRole.length > 0 ? userRole.map(u => u.role_id) : false

    // get anonymous data
    let anonymousData = { tokens: [] }
    if (anonymous) {
      anonymousData.tokens = (await user.getAnonymous()).tokens
    }

    // gen token to store on client
    const token = genToken({ _id, role, anonymous: anonymousData })

    return {
      _id, username, avatar, email, role, anonymousData, token
    }
  } catch (error) {
    serviceLogger('user.getOne', error.message)
    throw new Error(error)
  }
}

exports.get = async() => {
  try {
    return await repo.userRepository.find({ password: { $exists: false } })
  } catch (error) {
    serviceLogger('user.get', error.message)
    throw new Error(error)
  }
}

exports.remove = async(userId) => {
  try {
    const user = await repo.userRepository.findById(userId)
    if (user) user.remove()
    return user
  } catch (error) {
    serviceLogger('user.remove', error.message)
    throw new Error(error)
  }
}

exports.updatePassword = async({ user_id, current, change }) => {
  try {
    const user = await repo.userRepository.findById(user_id)

    // verify old password and change password
    let match = await user.comparePassword(current)
    if (match){
      user.password = change
      await user.save()

      //send change password mail
      mail.changePassword(user.email, user.username)
      return {
        status: 'success',
        data: user
      }
    }
    return { status: 'fail' }
  } catch (error) {
    serviceLogger('user.updatePassword', error.message)
    throw new Error(error)
  }
}

exports.forgot = async({ email, host }) => {
  try {
    const foundUser = await repo.userRepository.findOne({ email })

    if (foundUser){
      let token = genToken(foundUser._id)
      foundUser.resetPwToken = token
      foundUser.resetPwExpires = Date.now() + 3600000 // 1 hour
      await foundUser.save()

      // send token to reset password
      mail.forgotPassword(foundUser.email, foundUser.username, token, host)
      return {
        status: 'success',
        data: token
      }
    }
    return { status: 'fail' }
  } catch (error) {
    serviceLogger('user.forgot', error.message)
    throw new Error(error)
  }
}

exports.resetPassword = async({ token, password }) => {
  try {
    const foundUser = await repo.userRepository.findOne({
      resetPwToken: token,
      resetPwExpires: { $gt: Date.now() }
    })
    if (!foundUser) {
      return { status: 'fail' }
    }

    foundUser.password = password
    await foundUser.save()

    mail.changePassword(foundUser.email, foundUser.username)
    return {
      status: 'success',
      data: token
    }
  } catch (error) {
    serviceLogger('user.resetPassword', error.message)
    throw new Error(error)
  }
}

exports.contact = async({ title, content, user_id }) => {
  try {
    let listUser = []

    // get user mail from user_id
    for (let id of user_id) {
      let user = await repo.userRepository.findById(id)
      let { email, username } = user
      listUser.push(username)
      mail.contactUser(email, username, content, title)
    }
    return {
      status: 'success',
      data: listUser
    }
  } catch (error) {
    serviceLogger('user.contact', error.message)
    throw new Error(error)
  }
}

exports.getAvailable = async() => {
  try {
    const foundPeople = await repo.userRepository.find({
      isVerified: true,
      password: { $exists: false },
      room_id: { $exists: false }
    })
    return {
      status: 'success',
      data: foundPeople
    }
  } catch (error) {
    serviceLogger('user.getAvailable', error.message)
    throw new Error(error)
  }
}

exports.update = async({ user_id, dataReq }) => {
  try {
    const updateUser = await repo.userRepository.update({
      params: user_id,
      body: dataReq
    })
    return {
      status: 'success',
      data: updateUser
    }
  } catch (error) {
    serviceLogger('user.update', error.message)
    throw new Error(error)
  }
}
