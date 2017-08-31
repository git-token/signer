const net = require('net')
const { signerIpcPath } = require('../config')
const { sha3 } = require('ethereumjs-util')
const Promise = require('bluebird')

let client = net.connect(signerIpcPath)

Promise.delay(0, client.write(JSON.stringify({
  event: 'sign_transaction',
  data: {
    recoveryShare: 'f2b63522d42a447dc1e762414df177c11802b9219fdf55a60c8b5b2f75ad4fb2',
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
      recoveryShare: 'f2b63522d42a447dc1e762414df177c11802b9219fdf55a60c8b5b2f75ad4fb2',
      messageHash: sha3('Hello, World!').toString('hex')
    }
  })))
}).then(() => {
  return Promise.delay(1000, client.write(JSON.stringify({ event: 'get_address', data: {} })))
})

client.on('data', (data) => {
  console.log('data', JSON.parse(data))
})
