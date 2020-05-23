const db = require('../../models')
const { OWNER } = require('./data')

async function createUserWithRole(_user, role) {
  let user = await db.User.create(_user)
  await db.UserRole.create({ role_id: role._id, user_id: user._id })
}
  
async function createOwner() {
  try {
    let role = await db.Role.findOne({ code: '000' }).lean().exec()
    await createUserWithRole(OWNER, role)
  } catch(err) {
    console.log(err)
  }
}

module.exports = async function() {
  console.log('Seeding owner...')
  await createOwner()
}