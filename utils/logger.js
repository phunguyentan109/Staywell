const divider = '* ##################'

const logger = (type, from, msg) => {
  console.error(`\n${divider}`)
  console.error(`* [Error] ${type} => ${from}`)
  console.error(`* Desc: ${msg}\n`)
}

exports.controllerLogger = (from, msg) => logger('CONTROLLER', from, msg)

exports.serviceLogger = (from, msg) => logger('SERVICE', from, msg)

