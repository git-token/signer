"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRegistry;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [updateRegistry description]
 * @param  {Number} [deployed=1]       [description]
 * @param  {String} [organization=""]  [description]
 * @param  {String} [token_address=""] [description]
 * @param  {[type]} [date_deployed=0}] [description]
 * @return [type]                      [description]
 */
function updateRegistry(_ref) {
  var _this = this;

  var _ref$deployed = _ref.deployed,
      deployed = _ref$deployed === undefined ? 1 : _ref$deployed,
      _ref$organization = _ref.organization,
      organization = _ref$organization === undefined ? "" : _ref$organization,
      _ref$token_address = _ref.token_address,
      token_address = _ref$token_address === undefined ? "" : _ref$token_address,
      _ref$date_deployed = _ref.date_deployed,
      date_deployed = _ref$date_deployed === undefined ? new Date().getTime() : _ref$date_deployed;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query("\n      UPDATE registry\n      SET\n        deployed = \"" + deployed + "\",\n        token_address = \"" + token_address + "\",\n        date_deployed = " + date_deployed + "\n      WHERE organization = \"" + organization + "\";\n    ", function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}