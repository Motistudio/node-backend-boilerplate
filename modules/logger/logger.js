'use strict'

const winston = require('winston')

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const {timestamp, level, message, ...args} = info

    const ts = timestamp.slice(0, 19).replace('T', ' ')
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args) : ''}`
  })
)

module.exports = winston.createLogger({
  format: alignedWithColorsAndTime,
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      label: 'traders-main',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      exitOnError: false
    })
  ]
})
