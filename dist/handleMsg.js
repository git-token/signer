'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = handleMsg;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleMsg(msg) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var _JSON$parse = JSON.parse(msg.toString()),
        event = _JSON$parse.event,
        data = _JSON$parse.data;

    switch (event) {
      case 'sign_transaction':
        _this.wallet.signTransaction((0, _extends3.default)({}, data)).then(function (signedTx) {
          _this.socket.write((0, _stringify2.default)({ event: event, result: signedTx, message: 'Transaction Signed' }));
          return null;
        }).catch(function (error) {
          console.log('error', error);
          _this.socket.write((0, _stringify2.default)({ error: error.message }));
        });
        break;
      case 'sign_message':
        _this.wallet.signMessage((0, _extends3.default)({}, data)).then(function (signedMsg) {
          _this.socket.write((0, _stringify2.default)({ event: event, result: signedMsg, message: 'Message Signed' }));
          return null;
        }).catch(function (error) {
          console.log('error', error);
          _this.socket.write((0, _stringify2.default)({ error: error.message }));
        });
        break;
      case 'get_address':
        _this.wallet.getAddress().then(function (address) {
          _this.socket.write((0, _stringify2.default)({ event: event, result: address, message: 'Signer Address' }));
          return null;
        }).catch(function (error) {
          console.log('error', error);
          _this.socket.write((0, _stringify2.default)({ error: error.message }));
        });
        break;
      case 'deploy_contract':
        _this.deployContract((0, _extends3.default)({}, data)).then(function (txReceipt) {
          _this.socket.write((0, _stringify2.default)({ event: event, result: txReceipt, message: 'GitToken Contract Deployed Transaction Receipt' }));
        }).catch(function (error) {
          _this.socket.write((0, _stringify2.default)({ error: error.message }));
        });
        break;
      case 'sign_contract_transaction':
        _this.signContractTransaction((0, _extends3.default)({}, data)).then(function (txReceipt) {
          _this.socket.write((0, _stringify2.default)({ event: event, result: txReceipt, message: 'GitToken Contract Method Transaction Receipt' }));
        }).catch(function (error) {
          _this.socket.write((0, _stringify2.default)({ error: error.message }));
        });
        break;
      default:
        _this.socket.write((0, _stringify2.default)({ event: 'invalid_event', result: null, message: 'Invalid event: ' + event }));
    }
  });
}