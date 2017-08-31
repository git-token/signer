
/**
 * NOTE If running the server using NodeJS instead of docker-compose, uncomment the line
 * below to read the .env file and map to gittoken.config
 */

 require('dotenv').config({ path: `${process.cwd()}/.env`})

/**
 * Configuration file for GitToken server instance
 * This file parses the environment variable passed to the docker-compose.yml
 * env_file field, then exports the configuration to be used in the application.
 * @type {Object}
 */


const config = {
  ipcPath: process.env['SIGNER_IPC_PATH']
}

module.exports = config
