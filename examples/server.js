const GitTokenSigner = require('../dist/index').default
const { ipcPath } = require('../config')

let signer = new GitTokenSigner({
  ipcPath,
  web3Provider: 'http://138.68.225.133:8545',
  dirPath: process.cwd(),
  recover: true,
})
