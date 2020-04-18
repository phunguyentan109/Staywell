require('dotenv').config()

const seedPrice = require('./Price')
const seedUser = require('./User')
const seedRole = require('./Role')

async function seed() {
  console.log('\n----- SEEDING DATA -----')
  await seedRole()
  await seedUser()

  await seedPrice()

  console.log('----- SEED COMPLETED -----')
  process.exit()
}

seed()
