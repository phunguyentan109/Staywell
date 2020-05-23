require('dotenv').config()
const { clear } = require('./utils')

const seedPrice = require('./Price')
const seedUser = require('./User')
const seedOwner = require('./Owner')
const seedRole = require('./Role')

async function clearData() {
  console.log('\n----- REMOVING OLD DATA -----')
  await clear('Role', 'role')
  await clear('UserRole', 'user role')
  await clear('User', 'user')
  await clear('Price', 'price')
  console.log('=> Done')
}

async function seedSample() {
  console.log('\n----- SEEDING NEW DATA FOR DEVELOPMENT -----')
  await seedRole()
  await seedUser()
  await seedPrice()
}

async function seedData() {
  console.log('\n----- SEEDING NEW DATA FOR PRODUCTION -----')
  await seedRole()
  await seedOwner()
}

async function seed() {
  clearData()

  if(process.env.ENV_MODE === 'develop') {
    seedSample()
  } else {
    seedData()
  }

  console.log('=> Done')
  process.exit()
} 

seed()