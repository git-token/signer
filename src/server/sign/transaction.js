import Promise, { promisifyAll, join } from 'bluebird'



export default function transaction({ network, contract, method, params, recoveryShare, organization }) {
  return new Promise((resolve, reject) => {

    console.log('transaction::network', network)
    console.log('transaction::contract', contract)
    console.log('transaction::method', method)
    console.log('transaction::params', params)
    console.log('transaction::recoveryShare', recoveryShare)
    console.log('transaction::organization', organization)

    const { abi, unlinked_binary, networks } = JSON.parse(this.contracts[contract])

    const networkID = ({ network }) => {
      switch(network) {
        case 'torvalds':
          return '9';
          break;
        // case 'ethereum':
        //   return '1';
        //   break;
        default:
          return '9';
      }
    }


    console.log('networkID({ network })', networkID({ network }))
    console.log('networks', networks)
    const { address } = networks[networkID({ network })]
    // const data = this.ethProviders[network].contract(abi).at(address)[method].getData(...params)

    console.log('address', address)
    // console.log('data', data)

    // let address;
    // this.selectTokenFromRegistry({ organization }).then((_address) => {
    //   address = _address
    //   return this.ethProviders[network].contract(abi).at(address)[method].getData(...params)
    // }).then((data) => {
    //   return this.signTransaction({
    //     network,
    //     transaction: {
    //       to: address,
    //       data,
    //       gasPrice: 4e9, // 4 Gwei
    //       gasLimit: 6e6,
    //       value: 0
    //     },
    //     recoveryShare
    //   })
    // }).then((signedTx) => {
    //   console.log('signedTx', signedTx)
    //   return this.ethProviders[network].sendRawTransactionAsync(`0x${signedTx}`)
    // }).then((txHash) => {
    //   console.log('txHash', txHash)
    //   return this.getTransactionReceipt({ network, txHash })
    // }).then((txReceipt) => {
    //   resolve(txReceipt)
    // }).catch((error) => {
    //   console.log('error', error)
    //   reject(error)
    // })
  })
}
