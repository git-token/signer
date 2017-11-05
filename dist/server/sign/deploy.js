'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = deploy;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _registerContract = require('gittoken-registry/dist/registerContract');

var _registerContract2 = _interopRequireDefault(_registerContract);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [deploy description]
 * @param  {[type]} params        [description]
 * @param  {[type]} recoveryShare [description]
 * @param  {[type]} organization  [description]
 * @return [type]                 [description]
 */
function deploy(_ref) {
  var _this = this;

  var network = _ref.network,
      contract = _ref.contract,
      params = _ref.params,
      recoveryShare = _ref.recoveryShare,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var _ethProviders$network;

    _bluebird2.default.resolve((_ethProviders$network = _this.ethProviders[network].contract(abi).new).getData.apply(_ethProviders$network, (0, _toConsumableArray3.default)(params).concat([{
      data: unlinked_binary
    }]))).then(function (data) {
      return _this.signTransaction({
        network: network,
        transaction: {
          data: data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 47e5,
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