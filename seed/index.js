require('dotenv').config()
const { clear, isDevMode, isResetMode, inserting, connecting } = require('./utils')
const samples = require('./samples')
const { mapRoom, mapGroup, mapPrice } = require('./map')

async function discard() {
  if (!isDevMode && !isResetMode) return

  console.log('\n----- DISCARD DATABASE -----')

  let collections = [
    'Group',
    'User',
    'Price',
    'Room',
    'Contract',
    'Bill'
  ]

  await Promise.all(collections.map(clear))

  console.log('=> Done')
}

async function insert() {
  if (!isDevMode) return

  console.log('\n----- INSERT DATA -----')

  let collections = [
    'Price',
    'Room',
    'User',
    'Admin',
    'Group',
  ]

  await inserting(samples, collections)
}

async function connect() {
  if (!isDevMode) return

  console.log('\n----- CREATE DATA RELATIONS -----')

  let seedList = [
    mapRoom,
    mapGroup,
    mapPrice
  ]

  await Promise.all(seedList.flat().map(connecting))
}

async function run() {
  await discard()

  await insert()

  await connect()

  console.log('\n=> Completed')
}

run().catch(console.log).finally(process.exit)
