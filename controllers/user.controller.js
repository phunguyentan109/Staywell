const services = require('../services')
const _ = require('lodash')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.user')


exports.signUp = tracker.handler('signUp', async (req, res) => {
  const { body, header: { host } } = req
  const rs = await services.userService.signUp(body, host)

  return res.status(200).json(_.pick(rs, ['email', 'username']))
})


exports.logIn = tracker.handler('logIn', async (req, res) => {
  const rs = await services.userService.logIn(req.body)
  return res.status(200).json(rs)
}, { catchMsg: 'Invalid email/password.' })


exports.complete = tracker.handler('complete', async(req, res, next) => {
  let { user_id } = req.params
  const completeVal = await services.userService.complete(user_id)

  if (completeVal.status === 'fail') return res.redirect('/')

  res.locals.loadHtml = true

  return next()
}, { onCatch: (err, res) => res.redirect('/') })


exports.openRegistration = tracker.handler('openRegistration', async(req, res, next) => {
  const openRegistrationVal = await services.userService.openRegistration(res.locals.loginUserId)
  if (!openRegistrationVal) return next()

  return res.status(200).json({ success: true })
})


exports.getOne = tracker.handler('getOne', async(req, res) => {
  const user = await services.userService.getOne((req.params.user_id))
  return res.status(200).json({ ...user, anonymous: user.anonymousData })
})


exports.get = tracker.handler('get', async(req, res) => {
  const people = await services.userService.get()
  return res.status(200).json(people)
})


exports.remove = tracker.handler('remove', async(req, res) => {
  const user = await services.userService.remove(req.params.user_id)
  return res.status(200).json(user)
})


exports.forgot = tracker.handler('forgot', async(req, res) => {
  const { email } = req.body
  const { host } = req.headers

  let foundUser = await services.userService.forgot({ email, host })
  if (!foundUser.token) throw tracker.wrap('The email is not available.')

  return res.status(200).json(foundUser.token)
})


exports.resetPassword = tracker.handler('resetPassword', async(req, res) => {
  const { token } = req.params
  const { password } = req.body

  // find user by token and check timeout
  const foundUser = await services.userService.resetPassword({ token, password })
  if (!foundUser) throw tracker.wrap('The token is invalid or timeout.')

  return res.status(200).json(foundUser.token)
})


exports.contact = tracker.handler('contact', async(req, res) => {
  let { title, content, user_id } = req.body
  let listUser = await services.userService.contact({ title, content, user_id })

  return res.status(200).json(listUser.data)
})


exports.getAvailable = tracker.handler('getAvailable', async(req, res) => {
  const foundPeople = await services.userService.getAvailable()
  return res.status(200).json(foundPeople.data)
})


exports.update = tracker.handler('update', async(req, res) => {
  const updateUser = await services.userService.update({
    user_id: req.params.user_id,
    dataReq: req.body
  })

  return res.status(200).json(updateUser.data)
})
