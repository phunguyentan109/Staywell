const repo = require('../repositories')
const { serviceLogger } = require('../utils/logger')

exports.getOne = async(bill_id) => {
  try {
    return await repo.billRepository.findByIdLean(bill_id)
  } catch (err) {
    serviceLogger('bill.getOne', err.message)
    throw new Error(err)
  }
}
