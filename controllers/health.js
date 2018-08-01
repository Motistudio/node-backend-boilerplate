'use strict'

const config = require('../package')

/**
 * @class UserController
 */
module.exports = class HealthController {
  static heartbeat (request, response) {
    response.sendStatus(200)
  }

  static version (request, response) {
    response.status(200).json({version: config.version})
  }
}
