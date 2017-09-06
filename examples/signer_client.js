const GitTokenSignerClient = require('../dist/signerClient').default
const { signerIpcPath, recoveryShare } = require('../config')

const client = new GitTokenSignerClient({
  signerIpcPath,
  recoveryShare
})
