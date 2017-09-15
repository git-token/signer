"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertIntoTxReceipt;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [insertIntoTxReceipt description]
 * @param  {Number} [blockNumber=0]       [description]
 * @param  {String} [blockHash=""]        [description]
 * @param  {String} [contractAddress=""]  [description]
 * @param  {Number} [cumulativeGasUsed=0] [description]
 * @param  {Number} [gasUsed=0]           [description]
 * @param  {String} [transactionHash=""]  [description]
 * @param  {String} [organization=""}]    [description]
 * @return [type]                         [description]
 */
function insertIntoTxReceipt(_ref) {
  var _this = this;

  var _ref$blockNumber = _ref.blockNumber,
      blockNumber = _ref$blockNumber === undefined ? 0 : _ref$blockNumber,
      _ref$blockHash = _ref.blockHash,
      blockHash = _ref$blockHash === undefined ? "" : _ref$blockHash,
      _ref$contractAddress = _ref.contractAddress,
      contractAddress = _ref$contractAddress === undefined ? "" : _ref$contractAddress,
      _ref$cumulativeGasUse = _ref.cumulativeGasUsed,
      cumulativeGasUsed = _ref$cumulativeGasUse === undefined ? 0 : _ref$cumulativeGasUse,
      _ref$gasUsed = _ref.gasUsed,
      gasUsed = _ref$gasUsed === undefined ? 0 : _ref$gasUsed,
      _ref$transactionHash = _ref.transactionHash,
      transactionHash = _ref$transactionHash === undefined ? "" : _ref$transactionHash,
      _ref$organization = _ref.organization,
      organization = _ref$organization === undefined ? "" : _ref$organization;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query("\n      INSERT INTO transaction_receipts (\n        contract_address,\n        transaction_hash,\n        cumulative_gas_used,\n        block_hash,\n        block_number,\n        gas_used,\n        organization\n      ) VALUES (\n        \"" + contractAddress + "\",\n        \"" + transactionHash + "\",\n        " + cumulativeGasUsed + ",\n        \"" + blockHash + "\",\n        " + blockNumber + ",\n        " + gasUsed + ",\n        \"" + organization + "\"\n      );\n    ", function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}