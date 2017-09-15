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
export default function deploy({ params, recoveryShare, organization }) {
  return new Promise((resolve, reject) => {

    const { abi, unlinked_binary } = this.gitTokenContract;

    Promise.resolve(this.wallet.eth.contract(abi).new.getData(...params, {
      data: unlinked_binary
    })).then((data) => {
      return this.wallet.signTransaction({
        transaction: {
          data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 6e6,
          value: 0
        },
        recoveryShare
      })
    }).then((signedTx) => {
      return this.wallet.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.wallet.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      return join(
        txReceipt,
        this.insertIntoTxReceipt({
          ...txReceipt,
          organization
        }),
        this.updateRegistry({
          token_address: txReceipt['contractAddress'],
          organization: organization
        })
      )
    }).then((data) => {
      resolve(data[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
