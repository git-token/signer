'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenSignerClient = function () {
  function GitTokenSignerClient(_ref) {
    var signerIpcPath = _ref.signerIpcPath,
        deployParams = _ref.deployParams,
        recoveryShare = _ref.recoveryShare;
    (0, _classCallCheck3.default)(this, GitTokenSignerClient);

    this.signerIpcPath = signerIpcPath;
    this.recoveryShare = recoveryShare;
    this.signerConnect();
  }

  (0, _createClass3.default)(GitTokenSignerClient, [{
    key: 'signerConnect',
    value: function signerConnect() {
      var _this = this;

      this.signer = _net2.default.connect(this.signerIpcPath);
      this.signer.on('connect', function () {
        console.log('Connected to GitToken Signer');

        // Get Wallet / Signer Address
        _this.signer.write((0, _stringify2.default)({ event: 'get_address' }));

        // Listen for data
        _this.signer.on('data', function (msg) {
          var _JSON$parse = JSON.parse(msg),
              event = _JSON$parse.event,
              result = _JSON$parse.result;

          if (event == 'get_address') {
            console.log('GitToken Signer Address: ', result);
            _this.signerAddress = result;
          } else if (event == 'get_contract') {
            console.log('Set Updated Contract', result);
          } else if (event == 'error') {
            console.log('error:result', result);
          }
        });
      });

      this.signer.on('error', function () {
        console.log('Connection Error to GitToken Signer.');
        _this.signerReconnect();
      });

      this.signer.on('end', function () {
        console.log('Connection to GitToken Signer Closed.');
        _this.signerReconnect();
      });
    }
  }, {
    key: 'signerReconnect',
    value: function signerReconnect() {
      var _this2 = this;

      console.log('Attempting to Reconnect in 15 seconds...');
      setTimeout(function () {
        console.log('Attempting to Reconnect.');
        _this2.signerConnect();
      }, 1000 * 15);
    }
  }]);
  return GitTokenSignerClient;
}();

exports.default = GitTokenSignerClient;