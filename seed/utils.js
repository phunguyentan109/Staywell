const db = require('../../models')
const { connection } = require('mongoose')

async function clear(model, collection) {
  try {
    let data = await db[model].find().lean().exec()
    let existData = data.length > 0
    existData && await connection.db.dropCollection(collection)
  } catch(err) {
    console.log(err)
  }
}

module.exports = { clear }
