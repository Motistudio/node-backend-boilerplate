'use strict'

const Environment = require('../../modules/environment')

describe('Environment', () => {
  const origin = process.env.NODE_ENV
  afterAll(() => {
    process.env.NODE_ENV = origin
  })

  describe('Should read the environment', () => {
    test('default value is ok', () => {
      expect(Environment.getEnv()).toBe(origin)
    })
    test('environment changed', () => {
      process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'development' : 'production'
      expect(Environment.getEnv()).not.toBe(origin)
    })
    test('empty environment returns defauylt value', () => {
      process.env.NODE_ENV = ''
      expect(Environment.getEnv()).toBe('production')
    })
  })

  describe('Should recieve proper environment string values', () => {
    test('Return proper default value', () => {
      process.env.NODE_ENV = ''
      expect(Environment.getEnvironment()).toBe('Production')
    })
    test('Return Production for prod', () => {
      process.env.NODE_ENV = 'prod'
      expect(Environment.getEnvironment()).toBe('Production')
    })
    test('Return Development for dev', () => {
      process.env.NODE_ENV = 'dev'
      expect(Environment.getEnvironment()).toBe('Development')
    })
  })

  describe('Should return proper values for boolean methods', () => {
    test('Returns true when prod', () => {
      process.env.NODE_ENV = 'production'
      expect(Environment.isProd()).toBe(true)
    })
    test('Returns false when dev', () => {
      process.env.NODE_ENV = 'development'
      expect(Environment.isProd()).toBe(false)
    })
  })

  describe('Should reset the environment', () => {
    // change the environment to a different value from what it was
    beforeAll(() => {
      process.env.NODE_ENV = origin === 'production' ? 'development' : 'production'
      Environment.reset()
    })
    test('Environment value returned to what it was', () => {
      expect(process.env.NODE_ENV).toBe(origin)
    })
    test('Environment module returns the original value', () => {
      expect(Environment.getEnv()).toBe(origin)
    })
  })
})
