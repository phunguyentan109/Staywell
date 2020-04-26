const db = require('../models')

exports.existDocId = function (model, id) {
  return async(req, res, next) => {
    let foundData = await db[model].findById(req.params[id])
    if(!foundData) return next(new Error(`${model} ID not found. Please try again.`))
    return next()
  }
}
