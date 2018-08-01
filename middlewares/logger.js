'use strict'

const expressWinston = require('express-winston')
const Logger = require('../modules/logger')

/**
 * @exports Middleware/Logger @function
 * @description A function that set a logger middleware
 * @requires winston, express
 * @param {Object} app - express application instance
 */
module.exports = (app) => {
  return expressWinston.logger({
    level: 'verbose',
    winstonInstance: Logger.instance
  })
}
