import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'
import mysql from 'mysql'

import handleMsg from './handleMsg'
import deployContract from './deployContract'
import signContractTransaction from './signContractTransaction'
import saveContractAddress from './saveContractAddress'
import getContractAddress from './getContractAddress'
import saveTxReceipt from './saveTxReceipt'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

export default class GitTokenSigner  {
  constructor({
    mysqlHost,
    mysqlUser,
    mysqlRootPassword,
    mysqlDatabase,
    signerIpcPath,
    dirPath,
    recover,
    web3Provider,
    contractAddress
  }) {
    new KeystoreGenerator({
      dirPath,
      recover,
      web3Provider
    }).then((wallet) => {
      this.wallet = wallet
      this.handleMsg = handleMsg.bind(this)
      this.deployContract = deployContract.bind(this)
			this.signContractTransaction = signContractTransaction.bind(this)
      this.saveContractAddress = saveContractAddress.bind(this)
      this.getContractAddress = getContractAddress.bind(this)
      this.saveTxReceipt = saveTxReceipt.bind(this)

      this.gitTokenContract = { abi, unlinked_binary, address: contractAddress }

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

      this.server.listen({ path: signerIpcPath}, () => {
        console.log('GitToken Signer Listening at path: ', signerIpcPath)
      })

    }).catch((error) => {
      console.log('error', error)
    })
  }
}
