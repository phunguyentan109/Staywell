const repo = require('../repositories')
const mail = require('../utils/mail')
const { genToken } = require('../utils/token')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.user')


exports.getOne = monitor.seal('getOne', async (findQuery) => {
  const user = await repo.userRepository.findOne(findQuery)

  let { _id, username, email, avatar, password } = user

  // get permissions
  const group = await repo.userRepository.findUserGroup(_id.toString())
  const permissions = (group?.permissions || []).reduce((rs, n) => {
    rs[n] = true
    return rs
  }, {})

  const userData = { username, avatar, permissions, password }

  if (password) userData.token = genToken({ email, permissions })

  return userData
})


exports.logIn = monitor.seal('logIn', async (req) => {
  let { email, password } = req
  email = email.includes('@') ? email : `${email}@gmail.com`

  const user = await exports.getOne({ email })

  // compare password
  const match = await repo.userRepository.comparePassword(password, user.password)
  if (!match) throw monitor.wrap('Invalid email/password')

  return user
}, { catchMsg: 'Invalid email/password.' })


exports.completeVerify = monitor.seal('completeVerify', async (userId) => {
  let foundUser = await repo.userRepository.findOne({
    _id: userId,
  })

  if (!foundUser) throw monitor.wrap('User is not exist')

  if (foundUser.isVerified) return

  foundUser.isVerified = true
  await foundUser.save()
})


exports.get = monitor.seal('get', async (findQuery) => {
  return repo.userRepository.find(findQuery)
})


exports.remove = monitor.seal('remove', async (userId) => {
  const user = await repo.userRepository.findById(userId)
  if (user) await user.remove()
  return user
})


exports.updatePassword = monitor.seal('updatePassword', async ({ user_id, current, change }) => {
  const user = await repo.userRepository.findById(user_id)

  // verify old password and change password
  let match = await user.comparePassword(current)
  if (match) {
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


// exports.forgot = monitor.seal('forgot', async ({ email, host }) => {
//   const foundUser = await repo.userRepository.findOne({ email })
//
//   if (foundUser) {
//     let token = genToken(foundUser._id)
//     foundUser.resetPwToken = token
//     foundUser.resetPwExpires = Date.now() + 3600000 // 1 hour
//     await foundUser.save()
//
//     // send token to reset password
//     mail.forgotPassword(foundUser.email, foundUser.username, token, host)
//     return { status: 'success', data: token }
//   }
//
//   return { status: 'fail' }
// })


exports.resetPassword = monitor.seal('resetPassword', async ({ token, password }) => {
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


exports.contact = monitor.seal('contact', async ({ title, content, user_id }) => {
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


exports.update = monitor.seal('update', async ({ user_id, dataReq }) => {
  const updateUser = await repo.userRepository.update(user_id, dataReq)

  return { status: 'success', data: updateUser }
})
