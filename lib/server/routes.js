'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
    method: '*',
    path: '/icon/{param*}',
    handler: {
        directory: {
            path: _path2.default.normalize(__dirname + './../../icon/'),
            listing: true
        }
    }
}, {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: _path2.default.normalize(__dirname + './../../dist/'),
            listing: true
        }
    }
}, {
    method: '*',
    path: '/api/{path*}',
    handler: {
        proxy: {
            passThrough: true,
            xforward: true,
            mapUri: function mapUri(request, callback) {
                var proxyUrl = 'http://' + process.env.PROXY_HOST + ':' + process.env.PROXY_PORT + process.env.PROXY_PREFIX;
                callback(null, proxyUrl + request.params.path);
            }
            // See ho2o for more on proxy API. 
        }
    }
}, {
    method: '*',
    path: '/{path*}',
    config: {
        handler: function handler(req, rep) {
            (0, _render2.default)(req, rep, 'default');
        }
    }
}];