'use strict'

const http = require('http')
const Promise = require('bluebird')
const lodash = require('lodash')

const Configurations = require('../configurations')
const Environment = require('../environment')

const App = require('./app')

const prettyPrint = (message, padding = 0) => {
  const lines = Array(message.length + 1 + (padding * 2)).join('-')
  console.log(lines + '\n' + message + '\n' + lines)
}

const onListening = (app) => {
  console.log(`Server for ${app.get('name')} is up on ${app.get('port')}`)
}
const onClose = (app) => {
  prettyPrint(`Shut ${app.get('name')} down on ${app.get('port')} {${Environment.getEnvironment()}}`)
}
const onReady = (app) => {
  prettyPrint(`${app.get('name')} on ${app.get('port')} {${Environment.getEnvironment()}}`)
}

class Apps {
  static create (options = {}) {
    // is prod?
    return new App()
  }

  /**
   * Starts a new app
   * @param {Object} options - an options object
   * @param {String} options.name - The app's name
   * @param {String} options.port - The app's port
   * @param {String} options.ip - The app's ip
   * @returns {Promise} - a promise with the App instance (which also contains the express instance)
   */
  static up (options = {}) {
    options = {...Configurations.get(), env: Environment.getEnv(), ...lodash.omitBy(options, lodash.isNil)}
    const {name, port, ip} = options
    const app = new App({configuration: options})
    return Promise.resolve(app.instance).then((instance) => {
      const server = http.createServer(instance)
      server.on('connect', () => onListening(instance))
      server.on('close', () => onListening(instance))

      // evaluate if adding one parameter for port or two for port and ip
      server.listen(...([port, ip].filter(item => !!item)), () => onListening(instance))

      // set stuff
      instance.set('name', name)
      instance.set('server', server)
      instance.set('port', port)
      instance.set('ip', ip)

      return app
    }).then((app) => {
      return app.init()
    }).then((app) => {
      onReady(app.instance)
      return app
    })
  }

  static down (app) {
    const server = app.get('server')
    // const url = app.get('url')
    return Promise.resolve().then(() => {
      return app.kill()
    }).then(() => {
      server.close()
      server.unref()
    })
  }
}

module.exports = Apps
