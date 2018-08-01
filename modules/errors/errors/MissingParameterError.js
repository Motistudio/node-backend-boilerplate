'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'MissingParameterError'

/**
 * @class Errors/NotAllowedError
 */
module.exports = class MissingParameterError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}) {
    super(options, ERROR_NAME)
    this.name = ERROR_NAME
    this.template = 'Missing parameters'
    this.status = 400
    this.setMessage(options)
  }

  /**
   * An override
   */
  parse (options) {
    if (options && Array.isArray(options.parameters) && options.parameters.length === 1) {
      return `Missing parameter ${options.parameters[0]}`
    }
    return 'Missing parameters' + ((options && Array.isArray(options.parameters) && options.parameters.length) ? `: ${options.parameters.join(', ')}.` : '')
  }
}
