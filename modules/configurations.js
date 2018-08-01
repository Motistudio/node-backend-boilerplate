'use strict'

const lodash = require('lodash')
const EventEmitter = require('eventemitter2')

const Environment = require('./environment')

const mediator = new EventEmitter()
let config = require(Environment.isProd() ? '../config/server.prod.json' : '../config/server.json')

class Configurations {
  static get (property) {
    if (typeof property === 'string') {
      // takes result from the config
      // always return null if not found
      return lodash.result(config, property, null)
    }
    return config
  }

  static set (newConfig = {}, settings = {}) {
    // default settings
    settings = {merge: false, silent: false, ...settings}

    const current = config
    // updates
    if (settings && settings.merge) {
      config = {...config, ...newConfig}
    } else {
      config = {...newConfig}
    }
    if (!settings.silent) {
      mediator.emit('change', config, current)
    }
    return Configurations
  }
}
const actions = ['on', 'off']
actions.forEach((actionName) => {
  Configurations[actionName] = mediator[actionName].bind(mediator)
})

Configurations.mediator = mediator

module.exports = Configurations
