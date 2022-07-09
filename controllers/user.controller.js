const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.user')


exports.logIn = monitor.handler('logIn', async (req, res) => {
  const rs = await services.userService.logIn(req.body)
  return res.status(200).json(monitor.response(rs))
}, { catchMsg: 'Invalid email/password.' })


exports.getOne = monitor.handler('getOne', async(req, res) => {
  const user = await services.userService.getOne(req.body)
  return res.status(200).json(monitor.response(user))
})


exports.get = monitor.handler('get', async(req, res) => {
  const people = await services.userService.get({ password: { $exists: false } })
  return res.status(200).json(monitor.response(people))
})


exports.remove = monitor.handler('remove', async(req, res) => {
  const user = await services.userService.remove(req.params.user_id)
  return res.status(200).json(monitor.response(user))
})


exports.update = monitor.handler('update', async(req, res) => {
  const updateUser = await services.userService.update({
    user_id: req.params.user_id,
    dataReq: req.body
  })

  return res.status(200).json(monitor.response(updateUser.data))
})


exports.contact = monitor.handler('contact', async(req, res) => {
  let { title, content, user_id } = req.body
  let listUser = await services.userService.contact({ title, content, user_id })

  return res.status(200).json(monitor.response(listUser.data))
})


exports.getAvailable = monitor.handler('getAvailable', async(req, res) => {
  const foundPeople = await services.userService.get({
    isVerified: true,
    password: { $exists: false },
    roomId: { $exists: false }
  })

  return res.status(200).json(monitor.response(foundPeople.data))
})


exports.completeVerify = monitor.handler('completeVerify', async(req, res, next) => {
  let { userId } = req.params

  if (userId) await services.userService.completeVerify(userId)

  return next()
}, { onCatch: (err, res) => res.redirect('/') })


// exports.forgot = monitor.handler('forgot', async(req, res) => {
//   const { email } = req.body
//   const { host } = req.headers
//
//   let foundUser = await services.userService.forgot({ email, host })
//   if (!foundUser.token) throw monitor.wrap('The email is not available.')
//
//   return res.status(200).json(monitor.response(foundUser.token))
// })


// exports.resetPassword = monitor.handler('resetPassword', async(req, res) => {
//   const { token } = req.params
//   const { password } = req.body
//
//   // find user by token and check timeout
//   const foundUser = await services.userService.resetPassword({ token, password })
//   if (!foundUser) throw monitor.wrap('The token is invalid or timeout.')
//
//   return res.status(200).json(monitor.response(foundUser.token))
// })
