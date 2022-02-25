const repo = require('../repositories')
const { serviceLogger } = require('../utils/logger')

exports.create = async(req) => {
  try {
    const createRole = await repo.roleRepository.create(req)
    return createRole
  } catch (error) {
    serviceLogger('role.create', error.message)
    throw new Error(error)
  }
}
