const jwt = require('jsonwebtoken')

function genToken(data) {
  return jwt.sign(data, process.env.SECRET)
}

async function getRoleFromToken(header) {
  let token = header.split(' ')[1]
  return await jwt.verify(token, process.env.SECRET).roles[0].code
}

module.exports = { genToken, getRoleFromToken }
