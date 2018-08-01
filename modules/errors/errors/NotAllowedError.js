'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'NotAllowedError'

/**
 * @class Errors/NotAllowedError
 */
module.exports = class NotAllowedError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}) {
    super(options, ERROR_NAME)
    this.name = ERROR_NAME
    this.status = 401
    this.setMessage(options)
  }

  parse ({entity}) {
    return `${entity ? `${entity} is n` : 'N'}ot allowed`
  }
}
