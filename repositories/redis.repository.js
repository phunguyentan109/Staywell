const redis = require('redis')
const redisClient = redis.createClient({
  url: process.env.REDIS_STAYWELL
})

redisClient.connect().then(() => console.log('[ REDIS CONNECTED ]'))

exports.set = async (key, value) => {
  return redisClient.set(key, JSON.stringify(value))
}

exports.get = async(key) => {
  let value = await redisClient.get(key)
  return JSON.parse(value)
}

exports.getAll = async(pattern) => {
  let keys = [], count = 0

  do {
    let rs = await redisClient.scan(count, pattern)
    count = rs.cursor
    keys = [...keys, ...rs.keys]
  } while (count !== 0)

  if (keys.length === 0) return keys

  let allValues = await redisClient.mGet(keys)

  return allValues.map(v => JSON.parse(v))
}

exports.expireSet = async(key, value, time) => {
  await exports.set(key, value)
  await redisClient.expireAt(key, time)
}

exports.remove = (name) => {
  return redisClient.del(name)
}

exports.exist = async(token) => redisClient.exists(token)
