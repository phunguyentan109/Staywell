const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')
const mw = require('../middleware')

router.route('/')
  .get(hdl.Room.get)
  .post(mw.User.isPermit, hdl.Room.create)

router.route('/:room_id')
  .get(mw.User.isPermit, hdl.Room.getOne)
  .delete(mw.User.isPermit, hdl.Room.remove)
  .put(mw.User.isPermit, hdl.Room.update)

router.route('/:room_id/assign')
  .put(mw.User.isPermit, hdl.Room.assign)

router.use('/:room_id/contracts', require('./r-Contract'))

module.exports = router
