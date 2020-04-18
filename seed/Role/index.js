const db = require('../../models')
const { connection } = require('mongoose')
const ROLES = require('./data')

async function createRole(){
  try {
    let list = await db.Role.find()
    let existRole = list.length > 0

    // if exist then clear all
    existRole && await connection.db.dropCollection('roles')

    for(let role of ROLES){
      await db.Role.create(role)
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports = async() => {
  console.log('Seeding roles...')
  await createRole()
}
