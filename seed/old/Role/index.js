const db = require('../../../models')
const ROLES = require('./data')

async function createRole(){
  try {
    for (let role of ROLES){
      await db.Role.create(role)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = async() => {
  console.log('Seeding roles...')
  await createRole()
}
