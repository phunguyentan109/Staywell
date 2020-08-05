require('dotenv').config()
const { clear, isDevMode } = require('./utils')

const seedPrice = require('./Price')
const seedUser = require('./User')
const seedRole = require('./Role')

async function clearData() {
  console.log('\n----- REMOVING OLD DATA -----')
  await clear('Role', 'role')
  await clear('UserRole', 'user role')
  await clear('User', 'user')
  await clear('Price', 'price')
  console.log('=> Done')
}

async function seed() {
  isDevMode && await clearData()

  console.log('\n----- SEEDING NEW DATA -----')
  await seedRole()
  await seedUser()
  isDevMode && await seedSample()
  console.log('=> Done')
}

async function seedSample () {
  await seedPrice()
}

seed().then(() => process.exit())
