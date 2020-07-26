const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')
const mw = require('../middleware')
const { common } = require('../middleware')

router.route('/')
  .get(hdl.Contract.get)
  .post(common.existDocId('Room', 'room_id'), mw.Contract.create, hdl.Contract.getOne)

router.route('/:contract_id')
  .get(hdl.Contract.getOne)
  .delete(hdl.Contract.remove)

router.use('/:contract_id/bills', require('./r-Bill'))

module.exports = router
