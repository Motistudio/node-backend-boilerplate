'use strict'

const HealthController = require('../controllers/health')

// const enforceId = require('./params/id')

/**
 * @function Routes
 * @description sets up the application routes
 * @param {Object} app - an express instance app (not an App instance like in the rest of the system!)
 */
module.exports = (app) => {
  // params
  // app.param('id', enforceId)

  // admin
  app.get('/heartbeat', HealthController.heartbeat)
  app.get('/version', HealthController.version)
}
