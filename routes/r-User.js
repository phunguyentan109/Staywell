const express = require('express')
const hdl = require('../handlers')
const mw = require('../middleware')
const router = express.Router({ mergeParams: true })

router.route('/').get(hdl.User.get)
router.route('/available').get(hdl.User.getAvailable)

router.route('/login').post(hdl.User.logIn)
router.route('/forgot').post(hdl.User.forgot)

router.route('/registration').post(mw.User.isLogin, mw.User.isPermit, hdl.User.openRegistration)

router.route('/registration/:token')
  .post(mw.User.isValidRegisterToken, mw.User.disableToken, hdl.User.signUp)
  .delete(mw.User.isValidRegisterToken, mw.User.disableToken)

router.route('/:user_id')
  .get(mw.User.isLogin, hdl.User.getOne)
  .delete(hdl.User.remove)
  .put(hdl.User.update)

router.route('/:token/reset').put(hdl.User.resetPassword)

router.route('/:user_id/password').put(hdl.User.updatePassword)
router.route('/:user_id/contact').post(hdl.User.contact)

// LINKED ROUTES
router.use('/:user_id/contracts', require('./r-Contract'))
router.use('/:user_id/rooms', mw.User.isLogin, require('./r-Room'))
router.use('/:user_id/price', mw.User.isLogin, require('./r-Price'))
router.use('/:user_id/people', mw.User.isLogin, require('./r-People'))

// HANDLE UNFINISHED DONE REQUESTS
router.use((req, res) => res.status(200).json({ status: 'success' }))

module.exports = router
