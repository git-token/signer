'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = signContractTransaction;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * deployContract | Deployed GitToken Contract
 * @param  {Array} params         [ contributor, name, username, organization, symbol, decimals ]
 * @param  {String} recoveryShare Recovery Share for unlocking signer key
 * @return [Promise]              Resolves promise with txReceipt of contract
 */
function signContractTransaction(_ref) {
  var _this = this;

  var method = _ref.method,
      params = _ref.params,
      recoveryShare = _ref.recoveryShare;

  return new _bluebird2.default(function (resolve, reject) {
    var _gitTokenContract = _this.gitTokenContract,
        abi = _gitTokenContract.abi,
        unlinked_binary = _gitTokenContract.unlinked_binary,
        address = _gitTokenContract.address;


    _bluebird2.default.resolve(address).then(function (exists) {
      if (!exists) {
        return _this.getContractAddress();
      } else {
        return address;
      }
    }).then(function (_address) {
      var _wallet$eth$contract$;

      address = _address;
      return (_wallet$eth$contract$ = _this.wallet.eth.contract(abi).at(address)[method]).getData.apply(_wallet$eth$contract$, (0, _toConsumableArray3.default)(params));
    }).then(function (data) {
      return _this.wallet.signTransaction({
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