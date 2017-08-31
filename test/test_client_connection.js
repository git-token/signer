const path = require('path')
const assert = require('chai').assert
const net = require('net')
const fork = require('child_process').fork

const { ipcPath } = require('../config')

describe('GitToken Signer', function() {
  it('Should Succeed', function() {
    // const server = fork(`${process.cwd()}/dist/index.js`)

    const client = net.createConnection({ path: ipcPath })

    client.write('hello')

    assert(true == client.connecting, "Client is connecting to IPC Socket")
    assert(true == client.writable, "Socket connection is writable")

  }).timeout(20000)
})
