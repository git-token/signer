const net = require('net')
const { signerIpcPath, recoveryShare } = require('../config')
const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

Promise.delay(0, client.write(JSON.stringify({
  event: 'sign_transaction',
  data: {
    recoveryShare,
    transaction: {
      to: '0x98678e7c5fb95dd45e5326e271c14edd0f70adc8',
      data: null,
      value: 1e18
    }
  }
}))).then(() => {
  return Promise.delay(1000, client.write(JSON.stringify({
    event: 'sign_message',
    data: {
      recoveryShare,
      messageHash: sha3('Hello, World!').toString('hex')
    }
  })))
}).then(() => {
  return Promise.delay(1000, client.write(JSON.stringify({ event: 'get_address', data: {} })))
})

client.on('data', (data) => {
  console.log('data', JSON.stringify(JSON.parse(data), null, 2))
  process.exit()
})
