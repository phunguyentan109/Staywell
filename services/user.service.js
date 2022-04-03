const repo = require('../repositories')
const mail = require('../utils/mail')
const { genToken } = require('../utils/token')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('service.user')


exports.signUp = tracker.seal(async(body, host) => {
  const user = await repo.userRepository.create(body)
  const { email, username, _id } = user

  // Mail user to confirm email
  await mail.confirmMail(host, { to: email, viewName: username, userId: _id })

  return user
})


exports.logIn = tracker.seal('logIn', async (req) => {
  let { email, password } = req
  email = email.includes('@') ? email :`${email}@gmail.com`

  const user = await repo.userRepository.findOne({ email })

  const { _id, username, avatar, anonymous } = user

  // compare password
  const match = await user.comparePassword(password)
  if (!match) throw tracker.wrap('Invalid email/password')

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
}, { catchMsg: 'Invalid email/password.' })


exports.complete = tracker.seal('complete', async(userId) => {
  let foundUser = await repo.userRepository.findById(userId)

  if (!foundUser) throw tracker.wrap('User is not exist')

  foundUser.isVerified = true
  await foundUser.save()

  return { status: 'success' }
})


exports.openRegistration = tracker.seal(async (loginUserId) => {
  const registrationToken = jwt.sign({ openAt: moment() }, process.env.SECRET, { expiresIn: '24h' })

  let foundUser = await repo.userRepository.findById(loginUserId)

  if (foundUser) await foundUser.setAnonymousToken(registrationToken)

  return foundUser
})


exports.getOne = tracker.seal('getOne', async (userId) => {
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
})


exports.get = tracker.seal('get', async () => {
  return repo.userRepository.find({ password: { $exists: false } })
})


exports.remove = tracker.seal('remove', async(userId) => {
  const user = await repo.userRepository.findById(userId)
  if (user) user.remove()
  return user
})


exports.updatePassword = tracker.seal('updatePassword', async({ user_id, current, change }) => {
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
})


exports.forgot = tracker.seal('forgot', async({ email, host }) => {
  const foundUser = await repo.userRepository.findOne({ email })

  if (foundUser) {
    let token = genToken(foundUser._id)
    foundUser.resetPwToken = token
    foundUser.resetPwExpires = Date.now() + 3600000 // 1 hour
    await foundUser.save()

    // send token to reset password
    mail.forgotPassword(foundUser.email, foundUser.username, token, host)
    return { status: 'success', data: token }
  }

  return { status: 'fail' }
})


exports.resetPassword = tracker.seal('resetPassword', async({ token, password }) => {
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

  return { status: 'success', data: token }
})


exports.contact = tracker.seal('contact', async({ title, content, user_id }) => {
  let listUser = []

  // get user mail from user_id
  for (let id of user_id) {
    let user = await repo.userRepository.findById(id)
    let { email, username } = user
    listUser.push(username)
    mail.contactUser(email, username, content, title)
  }

  return { status: 'success', data: listUser }
})


exports.getAvailable = tracker.seal('getAvailable', async() => {
  const foundPeople = await repo.userRepository.find({
    isVerified: true,
    password: { $exists: false },
    room_id: { $exists: false }
  })

  return { status: 'success', data: foundPeople }
})


exports.update = tracker.seal('update', async({ user_id, dataReq }) => {
  const updateUser = await repo.userRepository.update({ params: user_id, body: dataReq })

  return { status: 'success', data: updateUser }
})
