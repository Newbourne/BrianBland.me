'use strict';

var _handleActions;

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxActions = require('redux-actions');

var _constants = require('./../constants');

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
    error: null,
    isErrorOpen: false
};

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, C.API_ERROR, function (state, action) {
    return {
        isErrorOpen: true,
        error: action.error
    };
}), _defineProperty(_handleActions, C.ERROR_RESET, function (state, action) {
    return {
        isErrorOpen: false,
        errorMsg: null
    };
}), _handleActions), initialState);