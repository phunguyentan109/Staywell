const repo = require('../repositories')

exports.getOne = async(bill_id) => {
  try {
    return await repo.billRepository.findByIdLean(bill_id)
  } catch (error) {
    throw new Error(error)
  }
}