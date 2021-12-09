require('dotenv').config()
const totalSeed = require('./totalSeed')
const { clear, isDevMode, isResetMode } = require('./utils')

async function clearData() {
  console.log('\n----- REMOVING OLD DATA -----')

  await clear('Role', 'role')

  await clear('UserRole', 'user role')

  await clear('User', 'user')

  await clear('Price', 'price')

  await clear('Room', 'room')

  await clear('Contract', 'contract')

  await clear('Bill', 'bill')

  console.log('=> Done')
}

async function seed() {
  (isDevMode || isResetMode) && await clearData()

  isDevMode && await totalSeed()
  console.log('=> Done')
}

seed().then(() => process.exit())
