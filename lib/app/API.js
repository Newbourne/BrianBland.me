'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API_INVOKER = undefined;
exports.api = api;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = new _remarkable2.default('commonmark');

var API_INVOKER = exports.API_INVOKER = Symbol('Invoke API');

function api(route, queryObj) {
    var apiHost = process.env.API_HOST;
    var apiPort = process.env.API_PORT;

    var url = 'http://' + apiHost + ':' + apiPort + '/api/' + route;

    var req = new Promise(function (resolve, reject) {
        _superagent2.default.get(url).query(queryObj).end(function (err, res) {
            if (err) {
                reject(err);
            } else {
                // read res headers for format
                // look for markdown
                // default to json
                var contentType = res.header["content-type"];
                if (contentType && contentType == "text/markdown; charset=utf-8") {
                    resolve(md.render(res.text));
                } else {
                    resolve(res.body);
                }
            }
        });
    });
    return req;
}