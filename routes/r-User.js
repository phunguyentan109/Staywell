const express = require('express')
const hdl = require('../handlers')
const mw = require('../middleware')
const router = express.Router({ mergeParams: true })

router.route('/').get(hdl.User.get)
router.route('/available').get(hdl.User.getAvailable)

router.route('/signup').post(mw.User.generateAvatar, hdl.User.signUp)
router.route('/login').post(hdl.User.logIn)
router.route('/forgot').post(hdl.User.forgot)

router.route('/:user_id')
  .get(mw.User.isLogin, hdl.User.getOne)
  .delete(hdl.User.remove)
  .put(hdl.User.update)

router.route('/:token/reset').put(hdl.User.resetPassword)

router.route('/:user_id/activate').put(hdl.User.activate)
router.route('/:user_id/password').put(hdl.User.updatePassword)
router.route('/:user_id/contact').post(hdl.User.contact)

router.use('/:user_id/rooms', mw.User.isLogin, require('./r-Room'))
router.use('/:user_id/price', mw.User.isLogin, require('./r-Price'))
router.use('/:user_id/people', mw.User.isLogin, require('./r-People'))
router.use('/:user_id/contracts', require('./r-Contract'))

module.exports = router
