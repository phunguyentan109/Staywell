const services = require('../services')
const Monitor = require('../utils/shield')

const monitor = new Monitor('controller.people')


exports.get = monitor.handler('get', async(req, res) => {
  const { peopleIds } = res.locals
  let foundPeople = await services.peopleService.get(peopleIds)

  return res.status(200).json(monitor.response(foundPeople))
})


exports.getNoAssign = monitor.handler('getNoAssign', async(req, res) => {
  const { peopleIds } = res.locals
  let foundPeople = await services.peopleService.getNoAssign(peopleIds)

  return res.status(200).json(monitor.response(foundPeople))
})


exports.remove = monitor.handler('remove', async(req, res) => {
  const foundPeople = await services.peopleService.remove(req.params.people_id)
  return res.status(200).json(monitor.response(foundPeople))
})


exports.getOne = monitor.handler('getOne', async(req, res) => {
  const people = await services.peopleService.getOne(req.params.people_id)
  return res.status(200).json(monitor.response(people))
})


exports.update  = monitor.handler('update', async(req, res) => {
  const updatedPeople = await services.peopleService.update({
    people_id: req.params.people_id,
    dataReq: req.body
  })

  return res.status(200).json(monitor.response(updatedPeople))
})
