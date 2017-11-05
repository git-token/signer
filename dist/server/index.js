'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _index = require('gittoken-keystore-generator/dist/index');

var _index2 = _interopRequireDefault(_index);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index3 = require('./socket/index');

var _index4 = require('./sign/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = (0, _bluebird.promisifyAll)(require('fs'));

var GitTokenSigner = function (_KeystoreGenerator) {
  (0, _inherits3.default)(GitTokenSigner, _KeystoreGenerator);

  function GitTokenSigner(_ref) {
    var signerIpcPath = _ref.signerIpcPath,
        dirPath = _ref.dirPath,
        recover = _ref.recover,
        web3Provider = _ref.web3Provider,
        torvaldsProvider = _ref.torvaldsProvider;
    (0, _classCallCheck3.default)(this, GitTokenSigner);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GitTokenSigner.__proto__ || (0, _getPrototypeOf2.default)(GitTokenSigner)).call(this, { dirPath: dirPath, recover: recover, web3Provider: web3Provider, torvaldsProvider: torvaldsProvider }));

    _promise2.default.resolve().then(function () {

      _this.signerIpcPath = signerIpcPath;
      _this.deploy = _index4.deploy.bind(_this);
      _this.handleMsg = _index3.handleMsg.bind(_this);
      _this.transaction = _index4.transaction.bind(_this);

      _this.server = _net2.default.createServer(function (socket) {
        _this.socket = socket;
        _this.socket.on('data', _this.handleMsg);
      });

      // Remove the existing IPC path if exists, then listen for events
      return fs.unlinkAsync(_this.signerIpcPath);
    }).then(function () {
      _this.listen();
    }).catch(function (error) {
      if (error.code == 'ENOENT') {
        _this.listen();
      } else {
        console.log('GitToken Signer Error: ', error);
      }
    });
    return _this;
  }

  (0, _createClass3.default)(GitTokenSigner, [{
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.server.listen({ path: this.signerIpcPath }, function () {
        console.log('GitToken Signer Listening at path: ', _this2.signerIpcPath);
      });
    }
  }]);
  return GitTokenSigner;
}(_index2.default);

exports.default = GitTokenSigner;