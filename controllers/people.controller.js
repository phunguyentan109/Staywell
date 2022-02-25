const services = require('../services')
const { controllerLogger } = require('../utils/logger')

exports.get = async(req, res, next) => {
  try {
    const { peopleIds } = res.locals
    let foundPeople = await services.peopleService.get(peopleIds)

    return res.status(200).json(foundPeople)
  } catch (err) {
    controllerLogger('people.get', err.message)
    return next(err)
  }
}

exports.getNoAssign = async(req, res, next) => {
  try {
    const { peopleIds } = res.locals
    let foundPeople = await services.peopleService.getNoAssign(peopleIds)
    return res.status(200).json(foundPeople)
  } catch (err) {
    controllerLogger('people.getNoAssign', err.message)
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    const foundPeople = await services.peopleService.remove(req.params.people_id)
    return res.status(200).json(foundPeople)
  } catch (err) {
    controllerLogger('people.remove', err.message)
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    const people = await services.peopleService.getOne(req.params.people_id)
    return res.status(200).json(people)
  } catch (err) {
    controllerLogger('people.getOne', err.message)
    return next(err)
  }
}

exports.update  = async(req, res, next) => {
  try {
    const updatedPeople = await services.peopleService.update({
      people_id: req.params.people_id,
      dataReq: req.body
    })
    return res.status(200).json(updatedPeople)
  } catch (err) {
    controllerLogger('people.update', err.message)
    return next(err)
  }
}
