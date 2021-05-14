const express = require('express')
const router = express.Router({ mergeParams: true })
const hdl = require('../handlers')
const mw = require('../middleware')

router.route('/')
  .get(hdl.Price.get)
  .post(mw.User.isPermit, hdl.Price.create)
  
router.route('/old').get(hdl.Price.getDeleted)

router.route('/old/:price_id').post(hdl.Price.restore)
  
router.route('/:price_id')
  .get(hdl.Price.getOne)
  .delete(mw.User.isPermit, hdl.Price.remove)
  .put(mw.User.isPermit, hdl.Price.update)

module.exports = router
