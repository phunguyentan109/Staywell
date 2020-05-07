const { casDelete } = require('../utils/dbSupport')

exports.user = {
  email: 'staywellsystem7@gmail.com',
  password: 'test'
}

exports.owner = {
  email: process.env.GMAILUSER,
  password: 'owner'
}

exports.price = {
  electric: 2232,
  wifi: 1,
  water: 50,
  house: 2000,
  extra: 70,
  type: 'priceTest',
  duration: 6
}

exports.bill = {
  amount: 101
}

exports.room = {
  name: 'Room 1',
  desc: 'Wide: 10, Long: 5'
}

exports.clear = async() => {
  try {
    await casDelete('User', 'email', exports.user.email)
    await casDelete('Room', 'name', exports.room.name)
    await casDelete('Price', 'type', exports.price.type)
    await casDelete('Bill', 'amount', exports.bill.amount)
  } catch(err) {
    console.log(err)
  }
}
