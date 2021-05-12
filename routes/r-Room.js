const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')
const mw = require('../middleware')

router.route('/')
  .get(hdl.Room.get)
  .post(mw.User.isPermit, mw.Room.create, hdl.Room.getOne)

router.route('/old')
  .get(hdl.Room.getDeleted)

router.route('/old/:room_id').post(hdl.Room.restore)

router.route('/:room_id')
  .get(mw.User.isPermit, hdl.Room.getOne)
  .delete(mw.User.isPermit, hdl.Room.remove)
  .put(mw.User.isPermit, mw.Room.update, hdl.Room.getOne)

router.route('/:room_id/assign').put(mw.User.isPermit, mw.Room.assign, hdl.Room.getOne)

router.use('/:room_id/contracts', require('./r-Contract'))

module.exports = router
