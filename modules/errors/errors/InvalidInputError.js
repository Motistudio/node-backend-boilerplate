'use strict'

const BaseError = require('../BaseError')

const ERROR_NAME = 'InvalidInputError'

/**
 * @class Errors/InvalidInputError
 */
module.exports = class InvalidInputError extends BaseError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}) {
    super(options, ERROR_NAME)
    this.name = ERROR_NAME
    this.template = 'Invalid input{{#if field}} for "{{field}}" field{{/if}}{{#if expect}}. Expected for {{expect}}, got {{got}}{{/if}}'
    this.status = 400
    this.setMessage(options)
  }

  parse ({field, expect, got}) {
    return `Invalid input${field ? ` for ${field}` : ''}${expect ? `Expected ${expect}${got ? `, got ${got}` : ''}` : ''}`
  }
}
