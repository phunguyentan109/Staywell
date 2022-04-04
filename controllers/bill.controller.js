const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.bill')


exports.getOne = monitor.handler('getOne', async(req, res) => {
  const bill_id = req.params.bill_id || res.locals.bill_id
  let foundBill = await services.billService.getOne(bill_id)

  return res.status(200).json(monitor.response(foundBill))
})
