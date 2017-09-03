const net = require('net')
const { signerIpcPath, recoveryShare } = require('../config')
const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

const params = [
  'Ryanmtate',
  'create',
  '',
  0,
  '00000000-0000-0000-0000-000000000000'
]

client.write(JSON.stringify({
  event: 'sign_contract_transaction',
  data: {
    recoveryShare,
    method: 'rewardContributor',
    params,
  }
}))


client.on('data', (data) => {
  console.log('data', JSON.parse(data))
  process.exit()
})
