'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _views = require('./views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Route,
    { component: _views.App },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _views.Root },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _views.AboutMe }),
        _react2.default.createElement(_reactRouter.Route, { path: 'me', component: _views.AboutMe }),
        _react2.default.createElement(_reactRouter.Route, { path: 'error', component: _views.Error }),
        _react2.default.createElement(_reactRouter.Route, { path: 'not-found', component: _views.NotFound }),
        _react2.default.createElement(_reactRouter.Route, { path: ':key', component: _views.AboutMe }),
        _react2.default.createElement(_reactRouter.Route, { path: '*', component: _views.AboutMe })
    )
);