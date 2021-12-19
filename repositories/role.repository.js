const db = require('../models')

exports.create = (data) => {
  return db.Role.create(data)
}
