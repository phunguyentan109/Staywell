const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')
// const mw = require("../middleware");

router.route('/latest_electric')
  .get(hdl.Bill.getLatestElectric)
  // .get(hdl.Bill.get)
  // .post(hdl.Bill.create)

router.route('/:bill_id')
  // .get(hdl.Bill.getOne)
  .put(hdl.Bill.update)

module.exports = router
