import Promise, { promisifyAll, join } from 'bluebird'

/**
 * [transaction description]
 * @param  {[type]} method        [description]
 * @param  {[type]} params        [description]
 * @param  {[type]} recoveryShare [description]
 * @param  {[type]} organization  [description]
 * @return [type]                 [description]
 */
export default function transaction({ network, contract, method, params, recoveryShare, organization }) {
  return new Promise((resolve, reject) => {
    let address;

    this.selectTokenFromRegistry({ organization }).then((_address) => {
      address = _address
      return this.ethProviders[network].contract(abi).at(address)[method].getData(...params)
    }).then((data) => {
      return this.signTransaction({
        network,
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
      return this.ethProviders[network].sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      console.log('txHash', txHash)
      return this.getTransactionReceipt({ network, txHash })
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      console.log('error', error)
      reject(error)
    })
  })
}
