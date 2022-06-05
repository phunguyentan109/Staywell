const express = require('express')
const mw = require('../middleware')
const { userController } = require('../controllers')
const router = express.Router({ mergeParams: true })

router.route('/')
  .get(userController.get)
  .post(mw.User.isLogin, userController.getOne)

router.route('/available').get(userController.getAvailable)

router.route('/login').post(userController.logIn)

router.route('/:user_id')
  .delete(userController.remove)
  .put(userController.update)

router.route('/:userId/verify')
  .get(userController.completeVerify)

// LINKED ROUTES
router.use('/:user_id/contracts', require('./r-Contract'))
router.use('/:user_id/rooms', mw.User.isLogin, require('./r-Room'))
router.use('/:user_id/price', mw.User.isLogin, require('./r-Price'))
router.use('/:user_id/people', mw.User.isLogin, require('./r-People'))

// HANDLE UNFINISHED DONE REQUESTS
router.use((req, res) => res.status(200).json({ status: 'success' }))

// router.route('/:token/reset').put(userController.resetPassword)

// router.route('/:user_id/password').put(userController.updatePassword)
// router.route('/:user_id/contact').post(userController.contact)

// router.route('/forgot').post(userController.forgot)

// router.route('/registration/:token')
//   .post(mw.User.isValidRegisterToken, mw.User.disableToken, userController.signUp)
//   .delete(mw.User.isValidRegisterToken, mw.User.disableToken)

module.exports = router

