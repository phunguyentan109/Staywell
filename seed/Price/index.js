const db = require('../../models')
const PRICE = require('./data')

async function createPrice() {
  try {
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
