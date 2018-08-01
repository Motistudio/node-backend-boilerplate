'use strict'

const Environment = require('../environment')
const logger = Environment.isProd() ? require('./loggerProd') : require('./logger')

/**
 * @module Logger
 * @description dealing with logging via winston logger
 */
class Logger {
  /**
   * @name getInstance
   * @description get the winston instance
   * @returns {Object} - a winston instance
   */
  static get instance () {
    return logger
  }
}

['silly', 'debug', 'verbose', 'info', 'warn', 'error', 'log'].forEach((action) => {
  Logger[action] = (...args) => {
    return logger[action](...args)
  }
})

module.exports = Logger
