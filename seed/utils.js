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
const isResetMode = process.env.ENV_MODE = 'reset'

module.exports = { clear, isDevMode, isResetMode }
