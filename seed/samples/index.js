const room = require('./room')
const price = require('./price')
const admin = require('./admin')
const user = require('./user')
const group = require('./group')

module.exports = {
  Room: room,
  Price: price,
  Admin: admin,
  User: user,
  Group: group
}
