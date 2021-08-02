const divider = '* ##################'

const logger = (type, from, msg) => {
  console.error(`\n${divider}`)
  console.error(`* [Error] ${type} => ${from}`)
  console.error(`* Desc: ${msg}\n`)
}

exports.hdLog = (from, msg) => logger('HANDLER', from, msg)
exports.mwLog = (from, msg) => logger('MIDDLEWARE', from, msg)

