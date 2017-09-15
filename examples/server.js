const GitTokenSigner = require('../dist/server/index').default
const {
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase,
  signerIpcPath,
  recover,
  web3Provider,
  dirPath
} = require('../config')

let signer = new GitTokenSigner({
  recover,
  signerIpcPath,
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase,
  web3Provider,
  dirPath
})
