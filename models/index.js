const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.Promise = Promise

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports.User = require('./user.model')

module.exports.Room = require('./room.model')

module.exports.Price = require('./price.model')

module.exports.Contract = require('./contract.model')
module.exports.Bill = require('./bill.model')

module.exports.Group = require('./group.model')
