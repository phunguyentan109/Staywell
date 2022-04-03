const services = require('../services')
const ErrorTracker = require('../utils/shield')

const tracker = new ErrorTracker('controller.people')


exports.get = tracker.handler('get', async(req, res) => {
  const { peopleIds } = res.locals
  let foundPeople = await services.peopleService.get(peopleIds)

  return res.status(200).json(foundPeople)
})


exports.getNoAssign = tracker.handler('getNoAssign', async(req, res) => {
  const { peopleIds } = res.locals
  let foundPeople = await services.peopleService.getNoAssign(peopleIds)

  return res.status(200).json(foundPeople)
})


exports.remove = tracker.handler('remove', async(req, res) => {
  const foundPeople = await services.peopleService.remove(req.params.people_id)
  return res.status(200).json(foundPeople)
})


exports.getOne = tracker.handler('getOne', async(req, res) => {
  const people = await services.peopleService.getOne(req.params.people_id)
  return res.status(200).json(people)
})


exports.update  = tracker.handler('update', async(req, res) => {
  const updatedPeople = await services.peopleService.update({
    people_id: req.params.people_id,
    dataReq: req.body
  })

  return res.status(200).json(updatedPeople)
})
