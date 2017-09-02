import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'

import handleMsg from './handleMsg'
import deployContract from './deployContract'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

export default class GitTokenSigner  {
  constructor({ signerIpcPath, dirPath, recover, web3Provider }) {
    new KeystoreGenerator({
      dirPath,
      recover,
      web3Provider
    }).then((wallet) => {
      this.wallet = wallet
      this.handleMsg = handleMsg.bind(this)
      this.deployContract = deployContract.bind(this)

      this.gitTokenContract = { abi, unlinked_binary, address: null }

      this.server = net.createServer((socket) => {
        this.socket = socket;
        this.socket.on('data', this.handleMsg)
      })

      this.server.listen({ path: signerIpcPath}, () => {
        console.log('GitToken Signer Listening at path: ', signerIpcPath)
      })

    }).catch((error) => {
      console.log('error', error)
    })
  }
}
