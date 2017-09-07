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

  var _JSON$parse = JSON.parse(msg),
      event = _JSON$parse.event,
      data = _JSON$parse.data,
      id = _JSON$parse.id;

  switch (event) {
    case 'sign_transaction':
      this.wallet.signTransaction((0, _extends3.default)({}, data)).then(function (signedTx) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: signedTx, message: 'Transaction Signed' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    case 'sign_message':
      this.wallet.signMessage((0, _extends3.default)({}, data)).then(function (signedMsg) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: signedMsg, message: 'Message Signed' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    case 'get_address':
      this.wallet.getAddress().then(function (address) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: address, message: 'Signer Address' }));
        return null;
      }).catch(function (error) {
        console.log('error', error);
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    case 'get_contract':
      this.getContractAddress().then(function (address) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: address, message: 'Contract Address' }));
      }).catch(function (error) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    case 'deploy_contract':
      this.deployContract((0, _extends3.default)({}, data)).then(function (txReceipt) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: txReceipt, message: 'GitToken Contract Deployed Transaction Receipt' }));
      }).catch(function (error) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    case 'sign_contract_transaction':
      this.signContractTransaction((0, _extends3.default)({}, data)).then(function (txReceipt) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: event, result: txReceipt, message: 'GitToken Contract Method Transaction Receipt' }));
      }).catch(function (error) {
        _this.socket.write((0, _stringify2.default)({ id: id, event: 'error', result: error.message }));
      });
      break;
    default:
      this.socket.write((0, _stringify2.default)({ id: id, event: 'invalid_event', result: null, message: 'Invalid event: ' + event }));
  }
}