const { casDelete } = require('../utils/dbSupport')

exports.clear = async(schema, col, value) => {
  try {
    await casDelete(schema, col, value)
  } catch (err) {
    console.log(err)
  }
}