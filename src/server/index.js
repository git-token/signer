import { promisifyAll } from 'bluebird'
import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'
import mysql from 'mysql'

import {
  handleMsg
} from './socket/index'

import {
  deploy,
  transaction
} from './sign/index'

import {
  insertIntoTxReceipt,
  updateRegistry,
  selectTokenFromRegistry
} from './sql/index'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)
const fs = promisifyAll(require('fs'))

export default class GitTokenSigner  {
  constructor({
    mysqlHost,
    mysqlUser,
    mysqlRootPassword,
    mysqlDatabase,
    signerIpcPath,
    dirPath,
    recover,
    web3Provider
  }) {
    new KeystoreGenerator({
      dirPath,
      recover,
      web3Provider
    }).then((wallet) => {

      this.signerIpcPath           = signerIpcPath
      this.wallet                  = wallet
      this.deploy                  = deploy.bind(this)
      this.handleMsg               = handleMsg.bind(this)
      this.transaction             = transaction.bind(this)
      this.updateRegistry          = updateRegistry.bind(this)
      this.gitTokenContract        = { abi, unlinked_binary }
      this.insertIntoTxReceipt     = insertIntoTxReceipt.bind(this)
      this.selectTokenFromRegistry = selectTokenFromRegistry.bind(this)

      this.server = net.createServer((socket) => {
        this.socket = socket;
        this.socket.on('data', this.handleMsg)
      })

      // Instantiate MySql Connection
      this.mysql = mysql.createConnection({
        host: mysqlHost,
        user: mysqlUser,
        password: mysqlRootPassword,
        database: mysqlDatabase,
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
