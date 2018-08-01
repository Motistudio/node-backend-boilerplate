'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'OperationFailedError'

/**
 * @class Errors/OperationFailedError
 */
module.exports = class OperationFailedError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}) {
    super(options, ERROR_NAME)
    this.name = ERROR_NAME
    this.status = 400
    this.setMessage(options)
  }

  getDefaultMessage () {
    return 'The operation has failed'
  }
}
