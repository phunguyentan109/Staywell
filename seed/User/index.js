const db = require('../../models')
const { OWNER, PEOPLE } = require('./data')
const { clear } = require('../utils')

async function createUserWithRole(_user, role) {
  let user = await db.User.create(_user)
  await db.UserRole.create({ role_id: role._id, user_id: user._id })
}

async function createOwner() {
  try {
    let role = await db.Role.findOne({ code: '000' }).lean().exec()
    await db.UserRole.create(OWNER, role)
  } catch(err) {
    console.log(err)
  }
}

async function createPeople() {
  try {
    let role = await db.Role.findOne({ code: '001' }).lean().exec()
    for(let people of PEOPLE) {
      await createUserWithRole(people, role)
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports = async function() {
  // Remove old data
  await clear('UserRole', 'userroles')
  await clear('User', 'users')

  let users = await db.User.find()
  let existUser = users.length > 0
  existUser

  console.log('Seeding owner with role...')
  await createOwner()
  console.log('Seeding people with role...')
  await createPeople()
}
