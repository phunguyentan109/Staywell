const moment = require('moment')
const db = require('../models')
const { pushId } = require('../utils/dbSupport')

exports.create = async(req, res, next) => {
  try {
    let { room_id } = req.params
    console.log(req.body)
    let crContract = await db.Contract.create({ ...req.body, room_id })

    // Save contract id to room
    await pushId('Room', room_id, 'contract_id', crContract._id)

    // Initial empty bills
    for (let i = 0; i < crContract.duration; i++) {
      let futureMonth = moment(crContract.time.from).add(i, 'M')
      let crBill = await db.Bill.create({
        deadline: moment(futureMonth).endOf('month'),
        contract_id: crContract._id
      })
      crContract.bill_id.push(crBill._id)
    }
    crContract.save()

    res.locals.contract_id = crContract._id
    return next()
  } catch (e) {
    return next(e)
  }
}
