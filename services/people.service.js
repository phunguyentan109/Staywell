const repo = require('../repositories')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('service.bill')

exports.get = tracker.seal('get', async (peopleIds) => {
  return repo.userRepository.findLean({ _id: { $in: peopleIds } })
})


exports.getOne = tracker.seal('getOne', async (people_id) => {
  return repo.peopleRepository.findById(people_id)
})


exports.getNoAssign = tracker.seal('getNoAssign', async (peopleIds) => {
  return repo.userRepository.getNoAssign(peopleIds)
})


exports.remove = tracker.seal('remove', async (people_id) => {
  let foundPeople = await repo.peopleRepository.findById(people_id)
  if (foundPeople) foundPeople.remove()
  return foundPeople
})


exports.update = tracker.seal('update', async ({ people_id, dataReq }) => {
  return repo.peopleRepository.findByIdAndUpdate(people_id, dataReq)
})

