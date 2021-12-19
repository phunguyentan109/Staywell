const express = require('express')
const router = express.Router()
const { peopleController } = require('../controllers')

router.route('/').get(peopleController.get)

router.route('/no-assign').get(peopleController.getNoAssign)

router.route('/:people_id')
  .get(peopleController.getOne)
  .delete(peopleController.remove)
  .put(peopleController.update)

module.exports = router
