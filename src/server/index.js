import { promisifyAll } from 'bluebird'
import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'

import {
  handleMsg
} from './socket/index'

import {
  deploy,
  transaction
} from './sign/index'

import GitTokenRegistry from 'gittoken-contracts/build/contracts/GitTokenRegistry.json'


const fs = promisifyAll(require('fs'))

export default class GitTokenSigner extends KeystoreGenerator {
  constructor({
    signerIpcPath,
    dirPath,
    recover,
    web3Provider,
    torvaldsProvider
  }) {
    super({ dirPath, recover, web3Provider, torvaldsProvider })

    this.contracts = {
      GitTokenRegistry
    }

    Promise.resolve().then(() => {

      this.signerIpcPath           = signerIpcPath
      this.deploy                  = deploy.bind(this)
      this.handleMsg               = handleMsg.bind(this)
      this.transaction             = transaction.bind(this)

      this.server = net.createServer((socket) => {
        this.socket = socket;
        this.socket.on('data', this.handleMsg)
      })

      // Remove the existing IPC path if exists, then listen for events
      return fs.unlinkAsync(this.signerIpcPath)
    }).then(() => {
        this.listen()
    }).catch((error) => {
      if (error.code == 'ENOENT') {
        this.listen()
      } else {
        console.log('GitToken Signer Error: ', error)
      }

    })
  }

  listen() {
    this.server.listen({ path: this.signerIpcPath }, () => {
      console.log('GitToken Signer Listening at path: ', this.signerIpcPath)
    })
  }
}
