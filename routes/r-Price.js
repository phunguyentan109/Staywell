const express = require('express')
const router = express.Router({ mergeParams: true })
const { priceController } = require('../controllers')
const mw = require('../middleware')

router.route('/')
  .get(priceController.get)
  .post(mw.User.isPermit, priceController.create)
  
router.route('/old').get(priceController.getDeleted)

router.route('/old/:price_id').post(priceController.restore)
  
router.route('/:price_id')
  .get(priceController.getOne)
  .delete(mw.User.isPermit, priceController.remove)
  .put(mw.User.isPermit, priceController.update)

module.exports = router
