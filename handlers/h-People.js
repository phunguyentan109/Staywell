const db = require('../models')

exports.get = async(req, res, next) => {
  try {
    const { peopleIds } = res.locals
    let foundPeople = await db.User.find({ _id: { $in: peopleIds } })
      .populate('room_id')
      .populate('user_id')
      .lean()
      .exec()
    return res.status(200).json(foundPeople)
  } catch(err) {
    return next(err)
  }
}

exports.getNoAssign = async(req, res, next) => {
  try {
    const { peopleIds } = res.locals
    let foundPeople = await db.User.find({ _id: { $in: peopleIds }, room_id: undefined })
      .populate('user_id')
      .lean()
      .exec()
    return res.status(200).json(foundPeople)
  } catch(err) {
    return next(err)
  }
}

exports.remove = async(req, res, next) => {
  try {
    let foundPeople = await db.People.findById(req.params.people_id)
    if(foundPeople) foundPeople.remove()
    return res.status(200).json(foundPeople)
  } catch(err) {
    return next(err)
  }
}

exports.getOne = async(req, res, next) => {
  try {
    let people = await db.People.findById({ _id: req.params.people_id })
    return res.status(200).json(people)
  } catch(err) {
    return next(err)
  }
}

exports.update  = async(req, res, next) => {
  try {
    let updatedPeople = await db.People.findByIdAndUpdate(req.params.people_id, req.body, { new: true })

    return res.status(200).json(updatedPeople)
  } catch(err) {
    return next(err)
  }
}
