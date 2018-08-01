'use strict'

const Promise = require('bluebird')
const express = require('express')

const setMiddlewares = require('../../middlewares')
const setRoutes = require('../../routes')

class App {
  constructor (options = {}) {
    // defaults
    options = {modules: [], configuration: {}, ...options}
    this.instance = express()
    this.configuration = options.configuration
    this.modules = options.modules || []
  }

  init () {
    return Promise.all(this.modules.map((Module) => Module.init())).then(() => {
      setMiddlewares(this.instance)
      setRoutes(this.instance)
    }).then(() => {
      return this
    })
  }
}

module.exports = App
