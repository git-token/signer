import Promise, { promisifyAll, join } from 'bluebird'
import registerContract from 'gittoken-registry/dist/registerContract'
import rp from 'request-promise'

/**
 * [deploy description]
 * @param  {[type]} params        [description]
 * @param  {[type]} recoveryShare [description]
 * @param  {[type]} organization  [description]
 * @return [type]                 [description]
 */
export default function deploy({ network, contract, params, recoveryShare, organization }) {
  return new Promise((resolve, reject) => {

    const { abi, unlinked_binary } = this.gitTokenContract;

    Promise.resolve(this.wallet.ethProviders[network].contract(abi).new.getData(...params, {
      data: unlinked_binary
    })).then((data) => {
      return this.wallet.signTransaction({
        network,
        transaction: {
          data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 47e5,
          value: 0
        },
        recoveryShare
      })
    }).then((signedTx) => {
      console.log('signedTx', signedTx)
      return this.wallet.ethProviders[network].sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      console.log('txHash', txHash)
      return this.wallet.getTransactionReceipt({ network, txHash })
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
