const express = require('express')
const router = express.Router()
const hdl = require('../handlers')
const mw = require('../middleware')

router.route('/').get(mw.User.getByRole, hdl.People.get)

router.route('/no-assign').get(mw.User.getByRole, hdl.People.getNoAssign)

router.route('/:people_id')
  .get(hdl.People.getOne)
  .delete(hdl.People.remove)
  .put(hdl.People.update)

module.exports = router
