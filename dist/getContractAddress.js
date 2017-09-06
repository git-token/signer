'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContractAddress;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContractAddress() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query('\n      SELECT address from gittoken_contracts ORDER BY date_deployed DESC limit 1;\n    ', function (error, result) {
      if (error) {
        reject(error);
      }
      if (!result[0]) {
        var _error = new Error('\n          Warning! No Contracts Found.\n          Please Deploy a new GitToken Contract.\n        ');
        reject(_error);
      } else {
        // console.log('getContractAddress::result[0].address', result[0].address)
        resolve(result[0].address);
      }
    });
  });
}