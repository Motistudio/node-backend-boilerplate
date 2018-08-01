'use strict'

const Configurations = require('../../modules/configurations')

describe.only('Configurations', () => {
  // preserve current state
  const current = Configurations.get()
  afterEach(() => {
    Configurations.set(current, {silent: true})
  })

  describe('Should set new configuration', () => {
    test('Configurations has been changed correctly', () => {
      const newConfig = {x: 5, y: 3, z: 1}
      Configurations.set(newConfig, {silent: true})
      expect(Configurations.get()).toEqual(newConfig)
    })
  })

  describe('Should add new configuration', () => {
    test('Configurations has been changed correctly', () => {
      const newConfig = {x: 5, y: 3, z: 1}
      Configurations.set(newConfig, {silent: true, merge: true})
      expect(Configurations.get()).toEqual({...current, ...newConfig})
    })
  })
})
