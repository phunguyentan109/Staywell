const express = require('express')
const router = express.Router({ mergeParams: true })
const { roomController } = require('../controllers')
const mw = require('../middleware')

router.route('/')
  .get(roomController.get)
  .post(mw.User.isPermit, mw.Room.create, roomController.getOne)

router.route('/old')
  .get(roomController.getDeleted)

router.route('/old/:room_id').post(roomController.restore)

router.route('/:room_id')
  .get(mw.User.isPermit, roomController.getOne)
  .delete(mw.User.isPermit, roomController.remove)
  .put(mw.User.isPermit, mw.Room.update, roomController.getOne)

router.route('/:room_id/assign').put(mw.User.isPermit, mw.Room.assign, roomController.getOne)

router.use('/:room_id/contracts', require('./r-Contract'))

module.exports = router
