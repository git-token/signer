import Promise, { promisifyAll, join } from 'bluebird'

/**
 * deployContract | Deployed GitToken Contract
 * @param  {Array} params         [ contributor, name, username, organization, symbol, decimals ]
 * @param  {String} recoveryShare Recovery Share for unlocking signer key
 * @return [Promise]              Resolves promise with txReceipt of contract
 */
export default function signContractTransaction({ method, params, recoveryShare }) {
  return new Promise((resolve, reject) => {

    let { abi, unlinked_binary, address } = this.gitTokenContract;

    Promise.resolve(address).then((exists) => {
      if (!exists) {
        return this.getContractAddress()
      } else {
        return address;
      }
    }).then((_address) => {
      console.log('_address', _address)
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
      return this.wallet.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.wallet.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      return join(
        txReceipt,
        this.saveTxReceipt(txReceipt)
      )
    }).then((data) => {
      resolve(data[0])
    }).catch((error) => {
      reject(error)
    })
  })
}
