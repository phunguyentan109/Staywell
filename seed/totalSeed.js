const db = require('../models')
const samp = require('./samples')

module.exports = async function seedSample () {
  try {
    console.log('\n----- SEEDING NEW DATA -----')

    console.log('Creating manager...')
    let manager = await db.User.create(samp.Manager)

    console.log('Creating manager role...')
    let managerRole = await db.Role.create(samp.ManagerRole)
    await db.UserRole.create({ role_id: managerRole._id, user_id: manager._id })

    console.log('Creating price...')
    let priceList = await Promise.all(samp.Price.map(pr => db.Price.create(pr)))

    console.log('Creating people...')
    let peopleList = await Promise.all(samp.People.map(pe => db.User.create(pe)))

    console.log('Creating room...')
    let createdRooms = {
      room25: await db.Room.create({
        ...samp.Room[0],
        price_id: priceList[0]._id,
        user_id: [
          peopleList[0]._id,
          peopleList[1]._id
        ]
      }),
      room35: await db.Room.create({
        ...samp.Room[1],
        price_id: priceList[1]._id,
        user_id: [
          peopleList[2]._id,
          peopleList[3]._id
        ]
      }),
      room35_2: await db.Room.create({
        ...samp.Room[2],
        price_id: priceList[1]._id
      }),
      room40: await db.Room.create({
        ...samp.Room[3],
        price_id: priceList[2]._id,
      }),
      room40_2: await db.Room.create({
        ...samp.Room[4],
        price_id: priceList[2]._id
      })
    }

    console.log('Connect room and user...')
    await createdRooms.room25.addIdToUser()
    await createdRooms.room35.addIdToUser()

    console.log('Create contract and bill...')
    for (let contractItem of samp.Contract) {
      let createdContract = await db.Contract.create({ ...contractItem, room_id: createdRooms[contractItem.for]._id })
      const bills = await Promise.all(contractItem.bills.map(b => db.Bill.create({
        ...b,
        contract_id: createdContract._id
      })))
      createdContract.bill_id = bills.map(b => b._id)
      await createdContract.save()
    }
  } catch (e) {
    console.log('seed sample', e.message)
  }
}
