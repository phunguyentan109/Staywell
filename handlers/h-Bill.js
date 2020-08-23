const db = require('../models')

exports.getOne = async(req, res, next) => {
  try {
    const bill_id = req.params.bill_id || res.locals.bill_id
    let foundBill = await db.Bill.findById(bill_id)
    return res.status(200).json(foundBill).lean().exec()
  } catch (err) {
    return next(err)
  }
}
