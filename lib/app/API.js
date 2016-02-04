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
    var protocol = undefined,
        host = undefined,
        url = undefined;

    if (process.env.CLIENT) {
        protocol = window.location.protocol;
        host = window.location.host;
    } else {
        /* server-side settings */
        var hostname = require('os').hostname();
        protocol = process.env.PROTOCOL + ':';
        host = hostname + ':' + process.env.PORT;
    }

    url = protocol + '//' + host + '/api/' + route;

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