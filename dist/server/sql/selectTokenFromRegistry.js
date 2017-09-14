'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectTokenFromRegistry;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [selectFromRegistry description]
 * @param  {[type]} organization [description]
 * @return [type]                [description]
 */
function selectTokenFromRegistry(_ref) {
  var _this = this;

  var organization = _ref.organization;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query('\n      SELECT token_address\n      FROM registry\n      WHERE organization = "' + organization + '"\n    ', function (error, result) {
      if (error) {
        reject(error);
      }
      if (!result[0]) {
        var _error = new Error('\n          Warning! No Contracts Found.\n\n          Please Deploy a new GitToken Contract.\n        ');
        reject(_error);
      } else {
        resolve(result[0].token_address);
      }
    });
  });
}