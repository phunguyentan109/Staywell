const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')

router.route('/:bill_id').put(hdl.Bill.update)

module.exports = router
