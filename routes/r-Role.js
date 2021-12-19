const express = require('express')
const router = express.Router()
const { roleController } = require('../controllers')

router.route('/new').post(roleController.create)

module.exports = router
