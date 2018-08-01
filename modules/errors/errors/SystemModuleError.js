'use strict'

const BaseError = require('../BaseError')
// const errors = require('./errors')

const ERROR_NAME = 'SystemModuleError'

/**
 * @class Errors/SystemModuleError
 */
module.exports = class SystemModuleError extends BaseError {
  /**
   * @constructor
   * @param {Object<Error>} error - An error object
   */
  constructor (error, options) {
    super(error.message, ERROR_NAME)

    this.message = error.message
    this.name = `${ERROR_NAME}-${error.message}`
  }
}
