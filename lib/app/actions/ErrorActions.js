'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorReset = errorReset;

var _constants = require('./../constants');

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function errorReset() {
    return {
        type: C.ERROR_RESET
    };
}