const services = require('../services')
const _ = require('lodash')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.user')


exports.signUp = monitor.handler('signUp', async (req, res) => {
  const { body, header: { host } } = req
  const rs = await services.userService.signUp(body, host)

  return res.status(200).json(monitor.response(_.pick(rs, ['email', 'username'])))
})


exports.logIn = monitor.handler('logIn', async (req, res) => {
  const rs = await services.userService.logIn(req.body)
  return res.status(200).json(monitor.response(rs))
}, { catchMsg: 'Invalid email/password.' })


exports.complete = monitor.handler('complete', async(req, res, next) => {
  let { user_id } = req.params
  const completeVal = await services.userService.complete(user_id)

  if (completeVal.status === 'fail') return res.redirect('/')

  res.locals.loadHtml = true

  return next()
}, { onCatch: (err, res) => res.redirect('/') })


exports.openRegistration = monitor.handler('openRegistration', async(req, res, next) => {
  const openRegistrationVal = await services.userService.openRegistration(res.locals.loginUserId)
  if (!openRegistrationVal) return next()

  return res.status(200).json(monitor.response({ success: true }))
})


exports.getOne = monitor.handler('getOne', async(req, res) => {
  const user = await services.userService.getOne((req.params.user_id))
  return res.status(200).json(monitor.response({ ...user, anonymous: user.anonymousData }))
})


exports.get = monitor.handler('get', async(req, res) => {
  const people = await services.userService.get()
  return res.status(200).json(monitor.response(people))
})


exports.remove = monitor.handler('remove', async(req, res) => {
  const user = await services.userService.remove(req.params.user_id)
  return res.status(200).json(monitor.response(user))
})


exports.forgot = monitor.handler('forgot', async(req, res) => {
  const { email } = req.body
  const { host } = req.headers

  let foundUser = await services.userService.forgot({ email, host })
  if (!foundUser.token) throw monitor.wrap('The email is not available.')

  return res.status(200).json(monitor.response(foundUser.token))
})


exports.resetPassword = monitor.handler('resetPassword', async(req, res) => {
  const { token } = req.params
  const { password } = req.body

  // find user by token and check timeout
  const foundUser = await services.userService.resetPassword({ token, password })
  if (!foundUser) throw monitor.wrap('The token is invalid or timeout.')

  return res.status(200).json(monitor.response(foundUser.token))
})


exports.contact = monitor.handler('contact', async(req, res) => {
  let { title, content, user_id } = req.body
  let listUser = await services.userService.contact({ title, content, user_id })

  return res.status(200).json(monitor.response(listUser.data))
})


exports.getAvailable = monitor.handler('getAvailable', async(req, res) => {
  const foundPeople = await services.userService.getAvailable()
  return res.status(200).json(monitor.response(foundPeople.data))
})


exports.update = monitor.handler('update', async(req, res) => {
  const updateUser = await services.userService.update({
    user_id: req.params.user_id,
    dataReq: req.body
  })

  return res.status(200).json(monitor.response(updateUser.data))
})
