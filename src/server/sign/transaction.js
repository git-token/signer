import Promise, { promisifyAll, join } from 'bluebird'

/**
 * [transaction description]
 * @param  {[type]} method        [description]
 * @param  {[type]} params        [description]
 * @param  {[type]} recoveryShare [description]
 * @param  {[type]} organization  [description]
 * @return [type]                 [description]
 */
export default function transaction({ method, params, recoveryShare, organization }) {
  return new Promise((resolve, reject) => {

    const { abi, unlinked_binary } = this.gitTokenContract;

    let address;

    this.selectTokenFromRegistry({ organization }).then((_address) => {
      address = _address
      return this.wallet.eth.contract(abi).at(address)[method].getData(...params)
    }).then((data) => {
      return this.wallet.signTransaction({
        transaction: {
          to: address,
          data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 6e6,
          value: 0
        },
        recoveryShare
      })
    }).then((signedTx) => {
      console.log('signedTx', signedTx)
      return this.wallet.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      console.log('txHash', txHash)
      return this.wallet.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      console.log('txReceipt', txReceipt )
      return join(
        txReceipt,
        this.insertIntoTxReceipt({
          ...txReceipt,
          organization
        })
      )
    }).then((data) => {
      console.log('data', data)
      resolve(data[0])
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
