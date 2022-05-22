const db = require('../../../models')
const ROOMS = require('./data')

async function createRoom(){
  try {
    let price = (await db.Price.find().lean().exec())[0]
    for (let room of ROOMS) {
      await db.Room.create({ ...room, price_id: price._id })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = async() => {
  console.log('Seeding rooms...')
  await createRoom()
}
