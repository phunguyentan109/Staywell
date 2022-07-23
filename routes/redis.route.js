const express = require('express')
const router = express.Router({ mergeParams: true })
const { redisController } = require('../controllers')

router.route('/registration')
  .get(redisController.getRegistrationTokens)
  .post(redisController.newRegistrationToken)

router.route('/registration/:token')
  .post(redisController.submitRegistrationToken)
  .delete(redisController.removeRegistrationToken)

module.exports = router
