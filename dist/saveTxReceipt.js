'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveTxReceipt;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveTxReceipt(_ref) {
  var _this = this;

  var blockNumber = _ref.blockNumber,
      blockHash = _ref.blockHash,
      contractAddress = _ref.contractAddress,
      cumulativeGasUsed = _ref.cumulativeGasUsed,
      gasUsed = _ref.gasUsed,
      transactionHash = _ref.transactionHash;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query('\n      INSERT INTO transaction_receipts (\n        contract_address,\n        transaction_hash,\n        cumulative_gas_used,\n        block_hash,\n        block_number,\n        gas_used\n      ) VALUES (\n        "' + contractAddress + '",\n        "' + transactionHash + '",\n        ' + cumulativeGasUsed + ',\n        "' + blockHash + '",\n        ' + blockNumber + ',\n        ' + gasUsed + '\n      )\n    ', function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}