const db = require('../models')
const { pushId } = require('../utils/dbSupport')
const moment = require('moment')

exports.get = async(req, res, next) => {
  try {
    let { room_id } = req.params
    let contracts = await db.Contract.find({ room_id }).populate('bill_id').lean().exec()
    return res.status(200).json(contracts)
  } catch (e) {
    return next(e)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const { contract_id } = req.params
    let foundContract = await db.Contract.findById(contract_id).populate('bill_id').lean().exec()
    return res.status(200).json(foundContract)
  } catch (e) {
    return next(e)
  }
}

exports.create = async(req, res, next) => {
  try {
    let { room_id } = req.params
    let crContract = await db.Contract.create({ ...req.body, room_id })

    // Save contract id to room
    await pushId('Room', room_id, 'contract_id', crContract._id)

    // Initial empty bills
    let endDate
    for (let i = 0; i < crContract.duration; i++) {
      let futureMonth = moment(crContract.start.date).add(i, 'M')
      let crBill = await db.Bill.create({
        deadline: moment(futureMonth).endOf('month'),
        contract_id: crContract._id
      })
      crContract.bill_id.push(crBill._id)
      if (i === crContract.duration - 1) endDate = crBill.deadline
    }
    crContract.save()

    // Format timeline
    let begin = moment(crContract.start.date).format('MMMM Do YYYY')
    let end = moment(endDate).format('MMMM Do YYYY')

    return res.status(200).json({
      begin, end,
      ...crContract.toJSON()
    })
  } catch (e) {
    return next(e)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let contract = await db.Contract.findById(req.params.contract_id)
    if(contract) await contract.remove()
    return res.status(200).json(contract)
  } catch(err) {
    return next(err)
  }
}
