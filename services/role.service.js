const repo = require('../repositories')

exports.create = async(req) => {
  try {
    const createRole = await repo.roleRepository.create(req)
    return createRole
  } catch (error) {
    throw new Error(error)
  }
}