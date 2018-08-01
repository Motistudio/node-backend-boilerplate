'use strict'

/**
 * Original ENV value, in case there were changes to process.env object
 */
const env = process.env.NODE_ENV

/**
 * @module Environment
 * @description Static class managing environment
 */
module.exports = class Environment {
  /**
   * Get the actual ENV value
   * @returns {String}
   */
  static getEnv () {
    return process.env.NODE_ENV || 'production'
  }

  /**
   * Returns full string of the current environment
   * @returns {String}
   */
  static getEnvironment () {
    return {
      'production': 'Production',
      'prod': 'Production',
      'development': 'Development',
      'dev': 'Development'
    }[Environment.getEnv()]
  }

  /**
   * Returns true if the environment is production
   * @return {Boolean}
   */
  static isProd (env = Environment.getEnv()) {
    return env === 'production' || env === 'prod'
  }

  /**
   * Reset the process.env.NODE_ENV to its default value
   * (the value that was loaded with the app)
   */
  static reset () {
    process.env.NODE_ENV = env
  }
}
