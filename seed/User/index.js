require('dotenv').config()
const db = require('../../models')
const { OWNER, PEOPLE } = require('./data')
const { isDevMode } = require('../utils')

async function createUserWithRole(_user, role) {
  let user = await db.User.create(_user)
  await db.UserRole.create({ role_id: role._id, user_id: user._id })
}

async function createOwner() {
  try {
    let role = await db.Role.findOne({ code: '000' }).lean().exec()
    await createUserWithRole(OWNER, role)
  } catch (err) {
    console.log(err)
  }
}

async function createPeople() {
  try {
    let role = await db.Role.findOne({ code: '001' }).lean().exec()
    for (let people of PEOPLE) {
      await createUserWithRole(people, role)
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
