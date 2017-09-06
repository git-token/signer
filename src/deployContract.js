import Promise, { promisifyAll, join } from 'bluebird'

/**
 * deployContract | Deployed GitToken Contract
 * @param  {Array} params         [ contributor, name, username, organization, symbol, decimals ]
 * @param  {String} recoveryShare Recovery Share for unlocking signer key
 * @return [Promise]              Resolves promise with txReceipt of contract
 */
export default function deployContract({ params, recoveryShare }) {
  return new Promise((resolve, reject) => {

    const { abi, unlinked_binary } = this.gitTokenContract;

    let txReceipt

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
    }).then((_txReceipt) => {
      txReceipt = _txReceipt
      this.gitTokenContract['address'] = txReceipt['contractAddress']

      const contract = this.wallet.eth.contract(abi)
        .at(txReceipt['contractAddress'])

      return join(
        contract.name.call(),
        contract.organization.call(),
        contract.decimals.call(),
        contract.symbol.call(),
        this.saveTxReceipt(txReceipt)
      )
    }).then((contractData) => {
      return this.saveContractAddress({
        address: txReceipt['contractAddress'],
        name: contractData[0],
        organization: contractData[1],
        decimals: contractData[2],
        symbol: contractData[3],
        date: new Date().getTime()
      })
    }).then((result) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
