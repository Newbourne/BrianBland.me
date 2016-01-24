'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxActions = require('redux-actions');

var _constants = require('./../constants');

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
    entry: null,
    endpoint: null
};

exports.default = (0, _reduxActions.handleActions)(_defineProperty({}, C.GET_ENTRY_SUCCESS, function (state, action) {
    return {
        entry: action.response,
        endpoint: action.endpoint
    };
}), initialState);