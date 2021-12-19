const express = require('express')
const router = express.Router({ mergeParams: true })
const { contractController } = require('../controllers')
const mw = require('../middleware')
const { common } = require('../middleware')

router.route('/')
  .post(
    common.existDocId('Room', 'room_id'),
    mw.Contract.create,
    contractController.getOne
  )

router.route('/list').post(contractController.get)

router.route('/:contract_id')
  .get(contractController.getOne)
  .delete(contractController.remove)

router.route('/:contract_id/latest_electric')
  .get(contractController.getLatestElectric)

router.use('/:contract_id/bills', require('./r-Bill'))

module.exports = router
