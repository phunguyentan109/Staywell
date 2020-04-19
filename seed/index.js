require('dotenv').config()
const { clear } = require('./utils')

const seedPrice = require('./Price')
const seedUser = require('./User')
const seedRole = require('./Role')

async function seed() {
  console.log('\n----- REMOVING OLD DATA -----')
  await clear('Role', 'role')
  await clear('UserRole', 'user role')
  await clear('User', 'user')
  await clear('Price', 'price')
  console.log('=> Done')

  console.log('\n----- SEEDING NEW DATA -----')
  await seedRole()
  await seedUser()
  await seedPrice()
  console.log('=> Done')

  process.exit()
}

seed()
