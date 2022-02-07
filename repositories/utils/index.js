const db = require('../../models')

exports.writeIdToDoc = async (targetModel, targetIds, idKey, idValue) => {
  if (targetIds.length === 0) return

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
  if (targetIds.length === 0) return

  return db[targetModel].updateMany(
    {
      _id: { $in: targetIds },
      [clearKey]: clearValue
    },
    {
      $unset : { [clearKey]: null }
    }
  )
}
