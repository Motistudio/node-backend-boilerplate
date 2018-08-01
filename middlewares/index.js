'use strict'

const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./logger')

/**
 * @function Middleware
 * @description Sets all middlewares on an express instance
 * @param {Object} app - an express instance (not an App instance like in the rest of the system!)
 */
module.exports = (app) => {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(logger())
}
