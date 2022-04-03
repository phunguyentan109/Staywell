const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.bill')


exports.getOne = tracker.handler('getOne', async(req, res) => {
  const bill_id = req.params.bill_id || res.locals.bill_id
  let foundBill = await services.billService.getOne(bill_id)

  return res.status(200).json(foundBill)
})
