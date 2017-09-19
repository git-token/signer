'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

  var params = _ref.params,
      recoveryShare = _ref.recoveryShare,
      organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var _wallet$eth$contract$;

    var _gitTokenContract = _this.gitTokenContract,
        abi = _gitTokenContract.abi,
        unlinked_binary = _gitTokenContract.unlinked_binary;


    _bluebird2.default.resolve((_wallet$eth$contract$ = _this.wallet.eth.contract(abi).new).getData.apply(_wallet$eth$contract$, (0, _toConsumableArray3.default)(params).concat([{
      data: unlinked_binary
    }]))).then(function (data) {
      return _this.wallet.signTransaction({
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
      return _this.wallet.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      console.log('txHash', txHash);
      return _this.wallet.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {

      console.log('txReceipt', txReceipt);

      return (0, _bluebird.join)(txReceipt, _this.insertIntoTxReceipt((0, _extends3.default)({}, txReceipt, {
        organization: organization
      })), _this.updateRegistry({
        token_address: txReceipt['contractAddress'],
        organization: organization
      }));
    }).then(function (data) {
      console.log('data', data);
      resolve(data[0]);
    }).catch(function (error) {
      console.log('error', error);
      reject(error);
    });
  });
}