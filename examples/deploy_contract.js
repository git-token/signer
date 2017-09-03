const net = require('net')
const { signerIpcPath, recoveryShare } = require('../config')
const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

const
  contributor  = '0x98678e7c5fb95dd45e5326e271c14edd0f70adc8',
  name         = 'GitToken',
  username     = 'Ryanmtate',
  organization = 'git-token',
  symbol       = 'GTK',
  decimals     = 8;

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
