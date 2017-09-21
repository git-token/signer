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

function handleMsg(_msg) {
  var _this = this;

  console.log('handleMsg::_msg', _msg);
  var msg = JSON.parse(_msg);
  console.log('handleMsg::msg', msg);
  var event = msg.event,
      data = msg.data,
      id = msg.id;

  switch (event) {
    case 'sign_transaction':
      this.wallet.signTransaction((0, _extends3.default)({}, data)).then(function (signedTx) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: signedTx, message: 'Transaction Signed' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error }));
      });
      break;
    case 'sign_message':
      this.wallet.signMessage((0, _extends3.default)({}, data)).then(function (signedMsg) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: signedMsg, message: 'Message Signed' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error }));
      });
      break;
    case 'get_address':
      this.wallet.getAddress().then(function (address) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: address, message: 'Signer Address' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error }));
      });
      break;
    case 'deploy_contract':
      this.deploy((0, _extends3.default)({}, data)).then(function (txReceipt) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: txReceipt, message: 'GitToken Contract Deployed Transaction Receipt' }));
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error }));
      });
      break;
    case 'sign_contract_transaction':
      this.transaction((0, _extends3.default)({}, data)).then(function (txReceipt) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: txReceipt, message: 'GitToken Contract Method Transaction Receipt' }));
      }).catch(function (error) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error }));
      });
      break;
    default:
      this.socket.write((0, _stringify2.default)({ id: id, event: 'invalid_event', result: null, message: 'Invalid event: ' + event }));
  }
}