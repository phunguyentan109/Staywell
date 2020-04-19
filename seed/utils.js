const db = require('../models')

async function clear(model, target) {
  try {
    console.log(`Removing old ${target}...`)
    await db[model].deleteMany({})
  } catch(err) {
    console.log(err)
  }
}

module.exports = { clear }
