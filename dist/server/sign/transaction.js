'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = transaction;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [transaction description]
 * @param  {[type]} method        [description]
 * @param  {[type]} params        [description]
 * @param  {[type]} recoveryShare [description]
 * @param  {[type]} organization  [description]
 * @return [type]                 [description]
 */
function transaction(_ref) {
  var _this = this;

  var network = _ref.network,
      contract = _ref.contract,
      method = _ref.method,
      params = _ref.params,
      recoveryShare = _ref.recoveryShare,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var address = void 0;

    _this.selectTokenFromRegistry({ organization: organization }).then(function (_address) {
      var _ethProviders$network;

      address = _address;
      return (_ethProviders$network = _this.ethProviders[network].contract(abi).at(address)[method]).getData.apply(_ethProviders$network, (0, _toConsumableArray3.default)(params));
    }).then(function (data) {
      return _this.signTransaction({
        network: network,
        transaction: {
          to: address,
          data: data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 6e6,
          value: 0
        },
        recoveryShare: recoveryShare
      });
    }).then(function (signedTx) {
      console.log('signedTx', signedTx);
      return _this.ethProviders[network].sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      console.log('txHash', txHash);
      return _this.getTransactionReceipt({ network: network, txHash: txHash });
    }).then(function (txReceipt) {
      resolve(txReceipt);
    }).catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}