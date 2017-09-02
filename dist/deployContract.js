'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = deployContract;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * deployContract | Deployed GitToken Contract
 * @param  {Array} params         [ contributor, name, username, organization, symbol, decimals ]
 * @param  {String} recoveryShare Recovery Share for unlocking signer key
 * @return [Promise]              Resolves promise with txReceipt of contract
 */
function deployContract(_ref) {
  var _this = this;

  var params = _ref.params,
      recoveryShare = _ref.recoveryShare;

  return new _bluebird2.default(function (resolve, reject) {
    var _wallet$eth$contract$;

    var _gitTokenContract = _this.gitTokenContract,
        abi = _gitTokenContract.abi,
        unlinked_binary = _gitTokenContract.unlinked_binary;


    (_wallet$eth$contract$ = _this.wallet.eth.contract(abi).new).getData.apply(_wallet$eth$contract$, (0, _toConsumableArray3.default)(params).concat([{
      data: unlinked_binary
    }])).then(function (data) {
      return _this.wallet.signTransaction({
        transaction: {
          data: data,
          gasPrice: 4e9, // 4 Gwei
          gasLimit: 6e6,
          value: 0
        },
        recoveryShare: recoveryShare
      });
    }).then(function (signedTx) {
      return _this.wallet.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      return _this.wallet.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}