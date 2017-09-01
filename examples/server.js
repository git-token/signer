const GitTokenSigner = require('../dist/index').default
const { signerIpcPath, recover } = require('../config')

let signer = new GitTokenSigner({
  recover,
  signerIpcPath,
  web3Provider: 'http://138.68.225.133:8545',
  dirPath: process.cwd(),
})
