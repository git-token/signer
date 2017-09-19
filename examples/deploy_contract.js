const net = require('net')
const {
  signerIpcPath,
  recoveryShare,
  contributor,
  name,
  username,
  organization,
  symbol,
  decimals
} = require('../config')

console.log(
  contributor,
  name,
  username,
  organization,
  symbol,
  decimals
)

const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

client.write(JSON.stringify({
  event: 'deploy_contract',
  data: {
    recoveryShare,
    params: [
      contributor,
      name,
      username,
      organization,
      symbol,
      decimals
    ]
  }
}))

client.on('data', (data) => {
  console.log('data', JSON.stringify(JSON.parse(data), null, 2))
  process.exit()
})
