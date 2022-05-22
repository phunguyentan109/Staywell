require('dotenv').config()
const db = require('../../../models')
const { OWNER, PEOPLE } = require('./data')
const { isDevMode } = require('../utils')

async function createOwner() {
  try {
    let role = await db.Role.findOne({ code: '000' }).lean().exec()
    let user = await db.User.create(OWNER)
    await db.UserRole.create({ role_id: role._id, user_id: user._id })
  } catch (err) {
    console.log(err)
  }
}

async function createPeople() {
  try {
    for (let people of PEOPLE) {
      await db.User.create(people)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = async function() {
  console.log('Seeding user...')
  await createOwner()
  isDevMode && await createPeople()
}
