'use strict'

const path = require('path')
const glob = require('glob')

const STRIP_EXTENSION_REGEX = /(.*)\.[^.]+$/i

const getErrors = () => {
  const names = glob.sync('**/*.js', {cwd: path.resolve(__dirname, './errors')})
  return names.reduce((obj, name) => {
    const parsedName = name.match(STRIP_EXTENSION_REGEX)[1]
    // return require(path.resolve(__dirname, name))
    obj[parsedName] = require(path.join(__dirname, './errors', name))
    return obj
  }, {})
}

/**
 * @module Errors
 * @description A module that gather and exports error classes
 */
class Errors {
  /**
   * @function get
   * @static
   * @description Get an error class by name
   * @param {String} name - The name of the error class
   * @returns {Function} - The error's class
   */
  static get (name) {
    return Errors.hasOwnProperty(name) ? Errors[name] : null
  }

  /**
   * Wraps an error to be an inner-error of our system
   */
  static wrap (e, ...args) {
    if (Errors.hasOwnProperty(e.name)) {
      return e
    }
    if (e.code && Errors.hasOwnProperty(e.code)) {
      return new Errors[e.code](e)
    }
    if (e && typeof e.error === 'object' && Errors.hasOwnProperty(e.error.code)) {
      return new Errors[e.error.code](e.error)
    }
    return new SystemModuleError(e, ...args)
  }
}

const errors = getErrors()
Object.keys(errors).forEach((errorName) => {
  Errors[errorName] = errors[errorName]
})

module.exports = Errors
