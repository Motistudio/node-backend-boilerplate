'use strict'

const Errors = require('../../modules/errors')
const BaseError = require('../../modules/errors/BaseError')

describe('Errors', () => {
  describe('Should have errors under Errors namespace', () => {
    const errorNames = Object.keys(Errors).filter(key => String(key).endsWith('Error'))
    test('Have errors', () => {
      expect(errorNames.length).toBeTruthy()
    })
    test('Every error is an Error instance', () => {
      expect(errorNames.every((name) => (typeof Errors[name] === 'function'))).toBe(true)
      expect(errorNames.every((name) => {
        const error = new Errors[name]('test')
        return error instanceof Error
      })).toBe(true)
    })
  })

  describe('BaseError check', () => {
    const error = new BaseError()
    test('Should be instance of Error', () => {
      expect(error instanceof Error).toBe(true)
    })
    test('Should get a default message', () => {
      expect(error.message).toBeTruthy()
    })
  })
})

// test('should check that all errors are instances of BaseError', t => {
//   t.plan(1)
//   const errors = [DuplicateNameError, InvalidInputError, NotAllowedError, NotFoundError, OperationFailedError, ValidationError, SystemModuleError]
//   t.ok(errors.every((ErrorClass) => {
//     const error = new ErrorClass()
//     return error instanceof BaseError
//   }), 'Every custom error is instance of BaseError')
//   t.end()
// })
//
// test('should check that all errors instances have the correct name', t => {
//   t.plan(1)
//   const errors = [BaseError, DuplicateNameError, InvalidInputError, NotAllowedError, NotFoundError, OperationFailedError, ValidationError, SystemModuleError]
//   t.ok(errors.every((ErrorClass) => {
//     const error = new ErrorClass()
//     return error.name === ErrorClass.name
//   }), 'Every error have the correct name')
//   t.end()
// })
//
// test('should create a new BaseError', t => {
//   t.plan(6)
//   const error = new BaseError()
//   t.ok(error, 'BaseError was created')
//   t.equals(error.name, 'BaseError', 'Error name is correct')
//   t.notEquals(error.message, '', 'Error message is not empty')
//   t.equals(error.getMessage(), error.message, 'Gets returns the correct error message')
//   t.equals(error.getStatus(), 500, 'Gets the response status out of the error')
//   t.equals(error.getCode(), error.name, 'Gets the code out of the error')
//   t.end()
// })
//
// test('should get an empty string if there is no template or override to parse', t => {
//   t.plan(2)
//   const error = new BaseError()
//   t.ok(error, 'BaseError was created')
//
//   error.template = null
//   t.equals(error.parse(), '', 'Gets an empty string')
//   t.end()
// })
//
// test('should get an object to send to the user', t => {
//   t.plan(3)
//   const error = new BaseError()
//   t.ok(error, 'BaseError was created')
//
//   const userError = error.toClient()
//   t.equals(userError.message, error.getMessage(), 'Message is correct')
//   t.equals(userError.code, error.getCode(), 'Code is correct')
//   t.end()
// })
//
// /**
//  * Tests for SystemModuleError
//  */
// test('should create a new SystemModuleError', t => {
//   t.plan(3)
//   // const message = 'some message'
//   const origin = new Error()
//   const error = new SystemModuleError(origin)
//   t.ok(error, 'SystemModuleError was created')
//   t.equals(error.origin, origin, 'SystemModuleError keeps a reference to the original error')
//   t.equals(error.message, errorList['n/a'], 'SystemModuleError instance message is the "n/a" default message')
//   t.end()
// })
//
// test('should parse SystemModuleError', t => {
//   t.plan(2)
//   const origin = new TypeError()
//   const error = new SystemModuleError(origin)
//   t.ok(error, 'SystemModuleError was created')
//   t.equals(error.message, errorList['TypeError'], 'SystemModuleError instance message is the "TypeError" default message')
//   t.end()
// })
//
// test('should parse SystemModuleError with a message', t => {
//   t.plan(2)
//   const message = 'some message'
//   const origin = new TypeError(message)
//   const error = new SystemModuleError(origin)
//   t.ok(error, 'SystemModuleError was created')
//   t.equals(error.message, message, 'SystemModuleError instance message is the "TypeError" default message')
//   t.end()
// })
//
// test('should wrap an error to be an inner-error', t => {
//   t.plan(4)
//   const externalError = new Error()
//   const innerError = new DuplicateNameError()
//   const externalWrap = Errors.wrap(externalError)
//   const innerWrap = Errors.wrap(innerError)
//   t.ok(externalWrap instanceof SystemModuleError, 'Wrapping an external error creates new SystemModuleError')
//   t.equals(externalWrap.origin, externalError, 'External wrapping keeps a reference to the original error')
//   t.ok(innerWrap instanceof DuplicateNameError, 'Wrapping an inner error returns the inner error')
//   t.equals(innerWrap, innerError, 'Inner wrapping is the same instance of the wrap argument')
//   t.end()
// })
//
// test('should wrap an error from an error output', t => {
//   t.plan(1)
//   const innerError = new DuplicateNameError()
//   const innerWrap = Errors.wrap(innerError.toClient())
//   t.ok(innerWrap instanceof DuplicateNameError, 'Wrapping an inner error returns the inner error')
//   t.end()
// })
//
// test('should wrap an error from a status error output', t => {
//   t.plan(2)
//   const original = new DuplicateNameError()
//   const statusError = new StatusCodeError()
//
//   statusError.error = original.toClient()
//   const wrap = Errors.wrap(statusError)
//   t.ok(wrap instanceof DuplicateNameError, 'Wrapping an inner error returns the inner error')
//   t.deepEqual(wrap.toClient(), original.toClient(), 'Client projection is correct')
//   t.end()
// })
//
// test('should wrap an error from a status error of a SystemModuleError output', t => {
//   t.plan(2)
//   const e = new Error('a message')
//   const original = new SystemModuleError(e)
//   const statusError = new StatusCodeError()
//
//   statusError.error = original.toClient()
//   const wrap = Errors.wrap(statusError)
//   t.ok(wrap instanceof SystemModuleError, 'Wrapping an inner error returns the inner error')
//   t.deepEqual(wrap.toClient(), original.toClient(), 'Client projection is correct')
//   t.end()
// })
//
// test('should wrap an error with params', t => {
//   t.plan(3)
//   const externalError = new StatusCodeError()
//   const url = 'test-url'
//   const wrap = Errors.wrap(externalError, {url: url})
//   t.ok(wrap instanceof SystemModuleError, 'Wrapping an external error creates new SystemModuleError')
//   t.equals(wrap.origin, externalError, 'Origin is the external error')
//   t.equals(wrap.getMessage(), `Forwarding data failed. URL ${url} could not be reached`)
//   t.end()
// })
//
// /**
//  * Tests for DuplicateNameError
//  */
// test('should create a new DuplicateNameError', t => {
//   t.plan(3)
//   const error = new DuplicateNameError()
//   t.ok(error, 'DuplicateNameError was created')
//   t.equals(error.name, 'DuplicateNameError', 'Error name is correct')
//   t.equals(error.message, 'Found a double entry', 'Error message is correct')
//   t.end()
// })
//
// test('should create a new DuplicateNameError with params', t => {
//   t.plan(4)
//   const name = 'Test123'
//   const error = new DuplicateNameError({name: name})
//   t.ok(error, 'DuplicateNameError was created')
//   t.equals(error.name, 'DuplicateNameError', 'Error name is correct')
//   t.equals(error.message, `Found a double entry, ${name} is already exists.`, 'Error message is correct')
//   t.equals(error.parse({name: 'test2'}), 'Found a double entry, test2 is already exists.', 'Error parsing is correct')
//   t.end()
// })
//
// test('should set message without params and get the default parse message', t => {
//   t.plan(4)
//   const name = 'Test123'
//   const error = new DuplicateNameError({name: 'doesn\'t matter'})
//
//   const message = 'Found a double entry'
//   const fullMessage = `Found a double entry, ${name} is already exists.`
//
//   error.setMessage()
//   t.ok(error, 'DuplicateNameError was created')
//   t.equals(error.message, message, 'Error message (partly) is correct')
//
//   error.setMessage({name: name})
//   t.equals(error.message, fullMessage, 'Error message (full) is correct')
//
//   error.setMessage('custom message')
//   t.equals(error.message, 'custom message', 'Error message (custom) is correct')
//   t.end()
// })
