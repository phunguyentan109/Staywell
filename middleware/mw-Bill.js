const db = require('../models')
const { mwLog } = require('../utils/logger')

exports.generate = async(req, res, next) => {
  try {
    const { bill_id, room_id } = req.params
    const { number, lastNumber } = req.body
    // get room's price
    let room = await db.Room.findById(room_id).populate('price_id').exec()
    let { electric, water, extra, living, wifi } = room.price_id
    // Generate bill
    const bill = {
      electric: {
        number,
        amount: number - lastNumber,
        cost: (number - lastNumber) * electric
      },
      wifi,
      water: water * room.user_id.length,
      living: living + (extra * (room.user_id.length - 1))
    }
    await db.Bill.findByIdAndUpdate(bill_id, bill, { new: true })
    return next()
  } catch (e) {
    mwLog('bill.generate')
    return next(e)
  }
}

exports.updatePayment = async(req, res, next) => {
  try {
    const { bill_id } = req.params
    await db.Bill.findByIdAndUpdate(bill_id, { paidDate: Date.now() })
    return next()
  } catch (e) {
    mwLog('bill.updatePayment')
    return next(e)
  }
}
