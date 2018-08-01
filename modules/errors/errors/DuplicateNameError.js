'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'DuplicateNameError'

/**
 * @class Errors/ValidationError
 */
class DuplicateNameError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (message) {
    super(message, ERROR_NAME)
    this.status = 400
  }
}

module.exports = DuplicateNameError
