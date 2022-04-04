const divider = '* ##################'
const _ = require('lodash')
const moment = require('moment')

const logger = (position, handler, msg, detail) => {
  console.error(`\n${divider}`)
  console.error(`* [Error] ${position} => ${handler}`)
  console.error(`* Desc: ${msg || 'N/A'}`)
  console.error(`* Detail: ${detail}\n`)
}

exports.loggerTypes = {
  controller: (from, msg, detail) => logger('CONTROLLER', from, msg, detail),
  service: (from, msg, detail) => logger('SERVICE', from, msg, detail)
}

class ErrorTracker extends Error {
  constructor(module) {
    super()
    this.module = module
    this.errFunc = ''
  }

  trackCall (func) {
    this.errFunc = func
  }

  validateParams (params) {
    let msg = params.filter(p => _.isString(p))?.[0] || ''
    let error = params.filter(p => _.isObject(p))?.[0] || ''
    return { msg, error }
  }

  response (data) {
    return { status: 200, data }
  }

  wrap(_msg, _error) {
    const { msg, error } = this.validateParams([_msg, _error])

    if (error?.occurAt) return error

    this.status = error?.status || 500
    this.message = error?.message || ''
    this.logicError = msg || error?.logicError || 'Oops, something went wrong...'
    this.occurAt = error?.occurAt || moment().valueOf()

    if (!error?.logicError && error?.stack) {
      const detail = _.trim(error?.stack.split('\n')[1])
      logger(this.module, this.errFunc, error?.message, detail)
    }

    return this
  }

  // Use for try/catch normal function
  seal (name, fn, options = {}) {
    return async (...args) => {
      this.trackCall(name)

      try {
        return await fn(...args)
      } catch (err) {
        const { catchMsg } = options
        throw this.wrap(catchMsg, err)
      }
    }
  }

  // Use for try/catch Node.js router callback
  handler (name, module, options = {}) {
    return async (req, res, next) => {
      this.trackCall(name)

      try {
        await module(req, res, next)
      } catch (err) {
        const { onCatch, catchMsg } = options

        if (onCatch) return onCatch(err, res)

        return next(this.wrap(catchMsg, err))
      }
    }
  }
}

module.exports = ErrorTracker
