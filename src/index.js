import KeystoreGenerator from 'gittoken-keystore-generator/dist/index'
import net from 'net'
import path from 'path'

import handleMsg from './handleMsg'

export default class GitTokenSigner  {
  constructor({ ipcPath, dirPath, recover, web3Provider }) {
    new KeystoreGenerator({
      dirPath,
      recover,
      web3Provider
    }).then((wallet) => {
      this.wallet = wallet
      this.handleMsg = handleMsg.bind(this)

      this.server = net.createServer((socket) => {
        this.socket = socket;
        this.socket.on('data', this.handleMsg)
      })

      this.server.listen({ path: ipcPath}, () => {
        console.log('GitToken Signer Listening at path: ', ipcPath)
      })

    }).catch((error) => {
      console.log('error', error)
    })
  }
}
