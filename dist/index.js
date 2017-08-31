'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _index = require('gittoken-keystore-generator/dist/index');

var _index2 = _interopRequireDefault(_index);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handleMsg = require('./handleMsg');

var _handleMsg2 = _interopRequireDefault(_handleMsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenSigner = function GitTokenSigner(_ref) {
  var _this = this;

  var signerIpcPath = _ref.signerIpcPath,
      dirPath = _ref.dirPath,
      recover = _ref.recover,
      web3Provider = _ref.web3Provider;
  (0, _classCallCheck3.default)(this, GitTokenSigner);

  new _index2.default({
    dirPath: dirPath,
    recover: recover,
    web3Provider: web3Provider
  }).then(function (wallet) {
    _this.wallet = wallet;
    _this.handleMsg = _handleMsg2.default.bind(_this);

    _this.server = _net2.default.createServer(function (socket) {
      _this.socket = socket;
      _this.socket.on('data', _this.handleMsg);
    });

    _this.server.listen({ path: signerIpcPath }, function () {
      console.log('GitToken Signer Listening at path: ', signerIpcPath);
    });
  }).catch(function (error) {
    console.log('error', error);
  });
};

exports.default = GitTokenSigner;