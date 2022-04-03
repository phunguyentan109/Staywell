const _ = require('lodash')
const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.contract')


exports.get = monitor.seal('get', async ({ filter, paging }) => {
  const populatePath = {
    path: 'room_id',
    select: 'user_id name',
    populate: {
      path: 'user_id',
      select: '_id avatar'
    }
  }
  return await repo.contractRepository.findLean(filter, populatePath, paging.size)
})


exports.getLatestElectric = monitor.seal('getLatestElectric', async (contract_id) => {
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
})


exports.getOne = monitor.seal('getOne', async (contract_id) => {
  return await repo.contractRepository.findByIdLean(contract_id, 'bill_id')
})


exports.remove = monitor.seal('remove', async (contract_id) => {
  let contract = await repo.contractRepository.findById(contract_id)
  contract && await contract.remove()
  return contract
})

