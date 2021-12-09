const services = require('../services')
const { hdLog } = require('../utils/logger')

exports.getOne = async(req, res, next) => {
  try {
    const bill_id = req.params.bill_id || res.locals.bill_id
    let foundBill = await services.billService.getOne(bill_id)
    return res.status(200).json(foundBill)
  } catch (err) {
    hdLog('bill.getOne', err.message)
    return next(err)
  }
}