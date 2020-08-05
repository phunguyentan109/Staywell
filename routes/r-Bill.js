const express = require('express')
const router = express.Router({ mergeParams: true })
const mw = require('../middleware')
const hdl = require('../handlers')

router.route('/:bill_id').post(mw.Bill.generate, hdl.Bill.getOne)

module.exports = router
