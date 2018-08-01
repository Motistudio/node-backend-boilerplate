'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'NotFoundError'

/**
 * @class Errors/NotFoundError
 */
module.exports = class NotFoundError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}) {
    super(options, ERROR_NAME)
    this.name = ERROR_NAME
    this.template = 'Could not find {{entity}}'
    this.status = 404
    this.setMessage(options)
  }

  parse ({entity}) {
    return `Could not find ${entity || 'entity'}`
  }
}
