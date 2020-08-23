const moment = require('moment')
const db = require('../models')
const { pushId } = require('../utils/dbSupport')

exports.create = async(req, res, next) => {
  try {
    let { room_id } = req.params
    let crContract = await db.Contract.create({ ...req.body, room_id })
    let fromTime = crContract.get('info.from', null, { getters: false })

    // Save contract id to room
    await pushId('Room', room_id, 'contract_id', crContract._id)

    // Initial empty bills
    for (let i = 0; i < crContract.duration; i++) {
      let deadline = moment(fromTime).add(i, 'M').endOf('month')
      let crBill = await db.Bill.create({ deadline, contract_id: crContract._id })
      crContract.bill_id.push(crBill._id)
    }
    await crContract.save()

    res.locals.contract_id = crContract._id
    return next()
  } catch (e) {
    return next(e)
  }
}
