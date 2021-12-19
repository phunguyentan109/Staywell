const _ = require('lodash')
const repo = require('../repositories')

exports.get = async({ filter, paging }) => {
  try {
    const populatePath = {
      path: 'room_id',
      select: 'user_id name',
      populate: {
        path: 'user_id',
        select: '_id avatar'
      }
    }
    return await repo.contractRepository.findLean(filter, populatePath, paging.size)
  } catch (error) {
    throw new Error(error)
  }
}

exports.getLatestElectric = async(contract_id) => {
  try {
    let { bill_id, info } = await repo.contractRepository.findByIdLean(contract_id, {
      path: 'bill_id',
      match: { electric: { $exists: true } }
    }, 'bill_id info.electric')
  
    if (!_.isEmpty(bill_id)) {
      // Get last electric number
      let electricNums = _.map(bill_id, b => b.electric.number)
      let highestNumber = Math.max(...electricNums)
      let foundBill = _.find(bill_id, b => b.electric.number === highestNumber)
      return foundBill.electric.number
    }
    return info.electric
  } catch (error) {
    throw new Error(error)
  }
}

exports.getOne = async(contract_id) => {
  try {
    return await repo.contractRepository.findByIdLean(contract_id, 'bill_id')
  } catch (error) {
    throw new Error(error)
  }
}

exports.remove = async(contract_id) => {
  try {
    let contract = await repo.contractRepository.findById(contract_id)
    contract && await contract.remove()
    return contract
  } catch (error) {
    throw new Error(error)
  }
}
