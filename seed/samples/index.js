const { manager, managerRole, people } = require('./user')

module.exports.Price = require('./price')
module.exports.Contract = require('./contract')
module.exports.Manager = manager
module.exports.ManagerRole = managerRole
module.exports.People = people
module.exports.Room = require('./room')
