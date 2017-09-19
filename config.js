
/**
 * NOTE If running the server using NodeJS instead of docker-compose, uncomment the line
 * below to read the .env file and map to config
 */

 require('dotenv').config({ path: `${process.cwd()}/.env`})

/**
 * Configuration file for GitToken signer instance
 * This file parses the environment variable passed to the docker-compose.yml
 * env_file field, then exports the configuration to be used in the application.
 * @type {Object}
 */


const config = {
  mysqlHost: process.env['MYSQL_HOST'],
  mysqlUser: process.env['MYSQL_USER'],
  mysqlRootPassword: process.env['MYSQL_ROOT_PASSWORD'],
  mysqlDatabase: process.env['MYSQL_DATABASE'],
	signerIpcPath: process.env['SIGNER_IPC_PATH'],
  recover: process.env['RECOVER_KEYSTORE'],
  recoveryShare: process.env['RECOVERY_SHARE'],
  web3Provider: process.env['WEB3_PROVIDER'],
  dirPath: process.env['KEYSTORE_DIR_PATH'],
  contributor: process.env['GITTOKEN_CONTRIBUTOR'],
  name: process.env['GITTOKEN_NAME'],
  username: process.env['GITTOKEN_GITHUB_USERNAME'],
  organization: process.env['GITTOKEN_GITHUB_ORGANIZATION'],
  symbol: process.env['GITTOKEN_SYMBOL'],
  decimals: process.env['GITTOKEN_DECIMALS']
}

module.exports = config
