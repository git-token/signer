import Promise, { promisifyAll, join } from 'bluebird'
import registerContract from 'gittoken-registry/dist/registerContract'
import rp from 'request-promise'

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

      const address = txReceipt['contractAddress']
      const name = contractData[0]
      const organization = contractData[1]
      const decimals = contractData[2]
      const symbol = contractData[3]
      const date = new Date().getTime()

      console.log(`
        address ${address},
        name ${name},
        organization ${organization},
        decimals ${decimals},
        symbol ${symbol},
        date ${date}
      `)

      return join(
        this.saveContractAddress({
          address,
          name,
          organization,
          decimals,
          symbol,
          date
        }),
        rp({
          method: 'POST',
          uri: 'https://registry.gittoken.io',
          body: {
            address,
            name,
            organization,
            decimals,
            symbol,
            date
          },
          json: true
        })
      )
    }).then(() => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
