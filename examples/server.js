const GitTokenSigner = require('../dist/index').default
const {
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase,
  signerIpcPath,
  recover
} = require('../config')

let signer = new GitTokenSigner({
  recover,
  signerIpcPath,
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase,
  web3Provider: 'http://138.68.225.133:8545',
  dirPath: process.cwd(),
})
