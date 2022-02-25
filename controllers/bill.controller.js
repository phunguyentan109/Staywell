const services = require('../services')
const { controllerLogger } = require('../utils/logger')

exports.getOne = async(req, res, next) => {
  try {
    const bill_id = req.params.bill_id || res.locals.bill_id
    let foundBill = await services.billService.getOne(bill_id)
    return res.status(200).json(foundBill)
  } catch (err) {
    controllerLogger('bill.getOne', err.message)
    return next(err)
  }
}
