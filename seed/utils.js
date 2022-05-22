const db = require('../models')
const _ = require('lodash')

exports.isDevMode = process.env.ENV_MODE === 'develop'
exports.isResetMode = process.env.ENV_MODE === 'reset'

exports.clear = async model => {
  try {
    console.log(`Removing ${model}...`)
    await db[model].deleteMany({})
  } catch (err) {
    console.log(err)
  }
}

exports.inserting = async (samples, sampleKeys) => {
  for (const sampleKey of sampleKeys) {
    console.log(`Inserting ${sampleKey}...`)

    if (sampleKey === 'Admin') {
      await Promise.all(samples[sampleKey].map(sample => db['User'].create(sample)))
      continue
    }

    if (!db[sampleKey]) continue

    await Promise.all(samples[sampleKey].map(sample => db[sampleKey].create(sample)))
  }
}

exports.connecting = async map => {
  try {
    let isRoot = !!map.seedName
    isRoot && console.log(`Connecting ${map.seedName}...`)

    const target = await db[map.schema].findOne(map.target)

    if (!target) return

    let updates = {}

    if (map.dependencies) {
      for (let depend of map.dependencies) {
        let foundRs = await db[depend.schema].find(
          {
            $or: _.isArray(depend.data) ? depend.data : [depend.data]
          }
        )

        updates[depend.path] = _.isArray(depend.data) ? foundRs.map(rs => rs._id) : foundRs[0]._id

        if (depend.childPath) {
          await Promise.all(depend.data.map(data => db[depend.schema].findOneAndUpdate(
            data,
            { [depend.childPath]: target._id }
          )))


        }
      }
    }

    if (!_.isEmpty(updates)) await db[map.schema].findOneAndUpdate(map.target, updates)
  } catch (e) {
    console.error(e)
    console.log('error => ' + map.seedName)
  }
}
