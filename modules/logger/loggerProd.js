'use strict'

const fs = require('fs')
const path = require('path')
const lodash = require('lodash')
const winston = require('winston')
require('winston-daily-rotate-file')

const Configurations = require('../configurations')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

/**
 * Get a log file name from configuration
 */
const getName = () => {
  const name = (Configurations.get() || {}).name || 'manager'
  return lodash.kebabCase(name.replace('pesos', ''))
}

/**
 * Initialized name
 */
let name = getName()

/**
 * Console format for winston printing
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const {timestamp, level, message, ...args} = info

    const ts = timestamp.slice(0, 19).replace('T', ' ')
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args) : ''}`
  })
)

/**
 * file format for winston writing
 */
const fileFormat = winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.printf((info) => {
  const {timestamp, ...rest} = info
  return JSON.stringify({...rest, '@timestamp': timestamp})
}))

/**
 * Returns the file transports for winston
 */
const getTransports = (name = getName()) => {
  return [
    new winston.transports.File({
      filename: path.resolve(`logs/${name}-json.log`),
      level: 'info',
      format: fileFormat
    }),
    new winston.transports.DailyRotateFile({
      filename: path.resolve(`logs/${name}-%DATE%-plain.log`),
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
      size: '100m',
      maxFiles: '14d',
      format: fileFormat
    })
  ]
}

const logger = winston.createLogger({
  transports: [
    ...getTransports(),
    new winston.transports.Console({
      format: consoleFormat,
      level: 'info'
    })
  ],
  exitOnError: false
})

Configurations.on('change', (config) => {
  const newName = getName()
  if (newName !== name) {
    const newTransports = getTransports(newName)
    logger
      .remove(winston.transports.Rotate)
      .remove(winston.transports.File)
    newTransports.forEach((transport) => logger.add(transport))
  }
})

module.exports = logger
