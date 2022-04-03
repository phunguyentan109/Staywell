const repo = require('../repositories')
const Monitor = require('../utils/shield')

const monitor = new Monitor('service.bill')

exports.get = monitor.seal('get', async (peopleIds) => {
  return repo.userRepository.findLean({ _id: { $in: peopleIds } })
})


exports.getOne = monitor.seal('getOne', async (people_id) => {
  return repo.peopleRepository.findById(people_id)
})


exports.getNoAssign = monitor.seal('getNoAssign', async (peopleIds) => {
  return repo.userRepository.getNoAssign(peopleIds)
})


exports.remove = monitor.seal('remove', async (people_id) => {
  let foundPeople = await repo.peopleRepository.findById(people_id)
  if (foundPeople) foundPeople.remove()
  return foundPeople
})


exports.update = monitor.seal('update', async ({ people_id, dataReq }) => {
  return repo.peopleRepository.findByIdAndUpdate(people_id, dataReq)
})

