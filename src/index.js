import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'
import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'

import handleMsg from './handleMsg'
import deployContract from './deployContract'
import signContractTransaction from './signContractTransaction'

const { abi, unlinked_binary } = JSON.parse(GitTokenContract)

export default class GitTokenSigner  {
  constructor({ signerIpcPath, dirPath, recover, web3Provider, contractAddress }) {
    new KeystoreGenerator({
      dirPath,
      recover,
      web3Provider
    }).then((wallet) => {
      this.wallet = wallet
      this.handleMsg = handleMsg.bind(this)
      this.deployContract = deployContract.bind(this)
			this.signContractTransaction = signContractTransaction.bind(this)

      this.gitTokenContract = { abi, unlinked_binary, address: contractAddress }

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
