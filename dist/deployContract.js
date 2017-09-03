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


    var txReceipt = void 0;

    _bluebird2.default.resolve((_wallet$eth$contract$ = _this.wallet.eth.contract(abi).new).getData.apply(_wallet$eth$contract$, (0, _toConsumableArray3.default)(params).concat([{
      data: unlinked_binary
    }]))).then(function (data) {
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
    }).then(function (_txReceipt) {
      txReceipt = _txReceipt;
      _this.gitTokenContract['address'] = txReceipt['contractAddress'];
      return (0, _bluebird.join)(_this.wallet.eth.contract(abi).at(txReceipt['contractAddress']).name.call(), _this.wallet.eth.contract(abi).at(txReceipt['contractAddress']).organization.call(), _this.wallet.eth.contract(abi).at(txReceipt['contractAddress']).decimals.call(), _this.wallet.eth.contract(abi).at(txReceipt['contractAddress']).symbol.call(), _this.saveTxReceipt(txReceipt));
    }).then(function (contractData) {
      return _this.saveContractAddress({
        address: txReceipt['contractAddress'],
        name: contractData[0],
        organization: contractData[1],
        decimals: contractData[2],
        symbol: contractData[3],
        date: new Date().getTime()
      });
    }).then(function (result) {
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}