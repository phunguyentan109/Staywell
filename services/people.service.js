const repo = require('../repositories')
const { serviceLogger } = require('../utils/logger')

exports.get = async (peopleIds) => {
  try {
    return await repo.userRepository.findLean({ _id: { $in: peopleIds } })
  } catch (error) {
    serviceLogger('people.get', error.message)
    throw new Error(error)
  }
}

exports.getOne = async(people_id) => {
  try {
    return await repo.peopleRepository.findById(people_id)
  } catch (error) {
    serviceLogger('people.getOne', error.message)
    throw new Error(error)
  }
}

exports.getNoAssign = async(peopleIds) => {
  try {
    return await repo.userRepository.getNoAssign(peopleIds)
  } catch (error) {
    serviceLogger('people.getNoAssign', error.message)
    throw new Error(error)
  }
}

exports.remove = async(people_id) => {
  try {
    let foundPeople = await repo.peopleRepository.findById(people_id)
    if (foundPeople) foundPeople.remove()
    return foundPeople
  } catch (error) {
    serviceLogger('people.remove', error.message)
    throw new Error(error)
  }
}

exports.update = async({ people_id, dataReq }) => {
  try {
    return await repo.peopleRepository.findByIdAndUpdate(people_id, dataReq)
  } catch (error) {
    serviceLogger('people.update', error.message)
    throw new Error(error)
  }
}
