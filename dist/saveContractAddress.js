'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveContractAddress;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveContractAddress(_ref) {
  var _this = this;

  var address = _ref.address,
      organization = _ref.organization,
      name = _ref.name,
      symbol = _ref.symbol,
      decimals = _ref.decimals,
      date = _ref.date;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query('\n      INSERT INTO gittoken_contracts (\n        address,\n        organization,\n        name,\n        symbol,\n        decimals,\n        date_deployed\n      ) VALUES (\n        "' + address + '",\n        "' + organization + '",\n        "' + name + '",\n        "' + symbol + '",\n        ' + decimals + ',\n        ' + date + '\n      )\n    ', function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}