'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transaction;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transaction(_ref) {
  var _this = this;

  var network = _ref.network,
      contract = _ref.contract,
      method = _ref.method,
      params = _ref.params,
      recoveryShare = _ref.recoveryShare,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {

    console.log('transaction::network', network);
    console.log('transaction::contract', contract);
    console.log('transaction::method', method);
    console.log('transaction::params', params);
    console.log('transaction::recoveryShare', recoveryShare);
    console.log('transaction::organization', organization);

    var _JSON$parse = JSON.parse(_this.contracts[contract]),
        abi = _JSON$parse.abi,
        unlinked_binary = _JSON$parse.unlinked_binary,
        networks = _JSON$parse.networks;

    var networkID = function networkID(_ref2) {
      var network = _ref2.network;

      switch (network) {
        case 'torvalds':
          return '9';
          break;
        // case 'ethereum':
        //   return '1';
        //   break;
        default:
          return '9';
      }
    };

    console.log('networkID({ network })', networkID({ network: network }));
    console.log('networks', networks);
    var address = networks[networkID({ network: network })].address;
    // const data = this.ethProviders[network].contract(abi).at(address)[method].getData(...params)

    console.log('address', address);
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
  });
}