const db = require('../index')

exports.saveIdToChildren = async (targetModel, targetIds, idKey, idValue) => {
  return db[targetModel].updateMany(
    {
      _id: { $in: targetIds },
      [idKey]: { $ne: idValue }
    },
    {
      [idKey]: idValue
    }
  )
}

exports.clearIdFromDoc = async (targetModel, targetIds, clearKey, clearValue) => {
  return db[targetModel].updateMany(
    {
      _id: { $in: targetIds },
      [clearKey]: { $ne: clearValue }
    },
    {
      [clearKey]: undefined
    }
  )
}
