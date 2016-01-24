'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _serializeJavascript = require('serialize-javascript');

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _store = require('./../app/store');

var _store2 = _interopRequireDefault(_store);

var _routes = require('./../app/routes');

var _routes2 = _interopRequireDefault(_routes);

var _App = require('./../app/views/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverSideRenderEnabled = true;

// Collects all static fetch functions from components
var getFetchFuncs = function getFetchFuncs(components, path) {
    var accumulator = [];
    _lodash2.default.forEach(components, function (component) {
        if (component.fetch) {
            if (component.displayName === 'Connect(Entry)') {
                accumulator.push(component.fetch(path));
            } else {
                accumulator.push(component.fetch());
            }
        }
    });
    return accumulator;
};

// https://www.promisejs.org/patterns/
// modified Promises.All()
var all = function all(promises, store) {
    var accumulator = [];
    var ready = Promise.resolve(null);

    promises.forEach(function (po) {
        ready = ready.then(function () {
            return store.dispatch(po);
        }).then(function (value) {
            accumulator.push(value);
        });
    });

    return ready.then(function () {
        return accumulator;
    });
};

function render(req, rep, layout) {
    var title = 'B.BLAND';

    /* Universal Implementation */
    /* Server-side Rendering */
    if (serverSideRenderEnabled) {
        (0, _reactRouter.match)({ routes: _routes2.default, location: req.url.path }, function (error, redirectLocation, renderProps) {
            if (error) {
                throw new Error('hit error');
            } else if (redirectLocation) {
                throw new Error('hit redirection');
            } else if (renderProps) {
                var componentChain;

                (function () {
                    var body = '';
                    var state = {};

                    var store = (0, _store2.default)({}, null, _reactRouterRedux.routeReducer);

                    /* Loop through+chain components.fetch() */
                    // We want to use store.dispatch to fire static actions
                    componentChain = getFetchFuncs(renderProps.components, req.url.path.substring(1));

                    all(componentChain, store).then(function () {
                        body = (0, _server.renderToString)(_react2.default.createElement(
                            _reactRedux.Provider,
                            { store: store },
                            _react2.default.createElement(_reactRouter.RouterContext, renderProps)
                        ));

                        state = (0, _serializeJavascript2.default)(store.getState());

                        rep.view(layout, { title: title, body: body, state: state });
                    }).catch(function (error) {
                        console.log('promise error ', error);
                        rep.view(layout, { title: title, state: state });
                    });
                })();
            } else {
                throw new Error('hit not found');
            }
        });
    } else {
        var state = (0, _serializeJavascript2.default)({});
        rep.view(layout, { title: title, state: state });
    }
}