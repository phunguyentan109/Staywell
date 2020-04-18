const db = require('../../models')
const { connection } = require('mongoose')
const PRICE = require('./data')

async function createPrice() {
  try {
    let foundPrice = await db.Price.find().lean().exec()
    let existPrice = foundPrice.length > 0

    // if exist then clear all
    existPrice && await connection.db.dropCollection('prices')

    for(let price of PRICE) {
      await db.Price.create(price)
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports = async() => {
  console.log('Seeding price...')
  await createPrice()
}
