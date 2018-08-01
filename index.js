'use strict'

global.Promise = require('bluebird')

const Configurations = require('./modules/configurations')
const Environment = require('./modules/environment')

Configurations.set(require(Environment.isProd() ? './config/server.prod' : './config/server'), {merge: true, silent: true})

const port = process.argv[2] || process.env.PORT
const ip = process.argv[3] || process.env.IP

const Apps = require('./modules/apps')

Apps.up({port, ip})
