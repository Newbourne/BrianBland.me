'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _routes = require('./routes.jsx');

var _routes2 = _interopRequireDefault(_routes);

var _store = require('./store.jsx');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var historyMiddleware = (0, _reactRouterRedux.syncHistory)(_reactRouter.browserHistory);

var state = window.__STATE__;
var store = (0, _store2.default)(state, historyMiddleware, _reactRouterRedux.routeReducer);

historyMiddleware.listenForReplays(store);

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.Router, {
        history: _reactRouter.browserHistory,
        routes: _routes2.default
    })
), document.getElementById('app'));