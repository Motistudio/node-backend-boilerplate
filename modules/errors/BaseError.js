'use strict'

// const Handlebars = require('handlebars')
const lodash = require('lodash')
const ExtendableError = require('es6-error')

const ERROR_NAME = 'BaseError'

const getDefaultMessage = (message) => {
  if (typeof message === 'string') {
    return message
  }
  return 'BaseError is an abstract class, there shouldn\'t be instances of it'
}

/**
 * @class Errors/BaseError
 */
module.exports = class BaseError extends ExtendableError {
  /**
   * @constructor
   * @param {Object|String} - A message for the error. If the value is object then it will be parsed with IO
   */
  constructor (options = {}, name = ERROR_NAME) {
    /**
     * Calls super with the error name
     * The passed message is empty because we need to parse it and can't call this before calling super,
     * good thing that we can set the message afterwards anyway
     */
    super('', name)
    this.status = 500
    this.code = name

    /**
     * badic properties
     */
    this.setMessage(options)
  }

  setMessage (options) {
    if (typeof options === 'string') {
      this.message === options
    } else if (typeof options === 'object') {
      this.message = this.parse(options)
    }
    this.message = this.getDefaultMessage()
  }

  getDefaultMessage () {
    return 'BaseError is an abstract class, there shouldn\'t be instances of it'
  }

  parse () {
    return this.getDefaultMessage()
  }

  toClient () {
    return {
      message: this.message,
      code: this.name
    }
  }
}
