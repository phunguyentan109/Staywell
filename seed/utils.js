const db = require('../models')

async function clear(model, target) {
  try {
    console.log(`Removing old ${target}...`)
    await db[model].deleteMany({})
  } catch (err) {
    console.log(err)
  }
}

const isDevMode = process.env.ENV_MODE === 'develop'

module.exports = { clear, isDevMode }
