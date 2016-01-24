'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAboutMeEntry = getAboutMeEntry;

var _constants = require('./../constants');

var C = _interopRequireWildcard(_constants);

var _API = require('../API');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAboutMeEntry() {
    return _defineProperty({}, _API.API_INVOKER, {
        types: [C.GET_ABOUTME, C.GET_ABOUTME_SUCCESS, C.API_ERROR],
        endpoint: 'me'
    });
}