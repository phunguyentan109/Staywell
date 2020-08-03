const db = require('../models')
const moment = require('moment')

exports.update  = async(req, res, next) => {
  try {
    const { bill_id, room_id } = req.params
    let bill = await db.Bill.findById(bill_id)
    let bills = await db.Bill.find({ room_id })

    let { amount, status, reset } = req.body
    if (!reset) {
      // get room's price
      let room = await db.Room.findById(room_id).populate('price_id').exec()
      let { electric, water, extra, house, wifi } = room.price_id

      // update amount
      if (amount) {
        // get last month used electric amount
        let doneBill = bills.filter(v => v.water !== 0)
        let prevAmount = 0
        if (doneBill.length > 0) {
          let lastDate = moment.max(doneBill.map(b => moment(b.pay.time)))
          let prevBill = bills.filter(b => moment(b.pay.time).isSame(lastDate))[0]
          prevAmount = prevBill.electric.amount
        }
        if (amount <= prevAmount) {
          return next({
            status: 400,
            message: 'The entered amount must be greater than the previous month\'s amount.'
          })
        }
        bill.electric = {
          amount: amount,
          cost: (amount - prevAmount) * electric
        }
      }

      // update payment status
      if (status !== undefined) bill.pay.status = status

      // calculate others missing bill fee
      if (bill.water === 0) {
        bill.water = water * room.people_id.length,
        bill.house = house + (extra * (room.people_id.length - 1)),
        bill.wifi = wifi
      }
    } else {
      bill.pay.status = false
      bill.house = 0
      bill.water = 0
      bill.electric.amount = 0
      bill.electric.cost = 0
      bill.wifi = 0
    }
    await bill.save()

    // search for unfinished bills
    let unfinishedBills = await db.Bill.find({ room_id, water: 0 })
    if (unfinishedBills.length === 0) {
      // if all are finished, close the contract
      await db.Bill.updateMany({ room_id, inContract: true }, { inContract: false })
      // then initial new contract for room
      let billList = []
      let foundRoom = await db.Room.findById(room_id)
      let price = await db.Price.findById(foundRoom.price_id)
      for (let i = 1; i <= price.duration; i++) {
        let bill = await db.Bill.create({
          pay: {
            time: moment().add(i, 'M')
          },
          room_id: foundRoom._id
        })
        billList.push(bill._id)
      }
      // save new contract's bill to room
      let { bill_id } = foundRoom
      foundRoom.bill_id = [...bill_id, ...billList]
      await foundRoom.save()
    }
    return res.status(200).json(bill)
  } catch (e) {
    return next(e)
  }
}
