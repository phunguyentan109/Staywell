const express = require('express')
const router = express.Router({ mergeParams: true })
const mw = require('../middleware')
const { billController } = require('../controllers')

router.route('/:bill_id')
  .post(mw.Bill.generate, billController.getOne)
  .put(mw.Bill.updatePayment, billController.getOne)

module.exports = router
