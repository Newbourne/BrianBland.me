'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _redux = require('redux');

var _API = require('./API');

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* eslint no-console: 0 */
var logger = function logger(store) {
    return function (next) {
        return function (action) {
            if (process.env.NODE_ENV !== 'production' && process.env.CLIENT) {
                var type = action[_API.API_INVOKER];
                if (typeof type === 'undefined') {
                    type = action.type;
                } else {
                    type = type.types[0];
                }
                console.group(type);
                console.log('dispatching', action);
                var result = next(action);
                console.log('next state', store.getState());
                console.groupEnd(type);
                return result;
            } else {
                return next(action);
            }
        };
    };
};

function callApi(endpoint, data) {
    return (0, _API.api)(endpoint, data);
}

/* Visit later for cleanup */
var api_middleware = function api_middleware(store) {
    return function (next) {
        return function (action) {
            var callAPI = action[_API.API_INVOKER];
            if (typeof callAPI === 'undefined') {
                return next(action);
            }

            var types = callAPI.types;
            var endpoint = callAPI.endpoint;
            var data = callAPI.data;

            if (typeof endpoint !== 'string') {
                throw new Error('Specify a string endpoint URL.');
            }
            if (!Array.isArray(types) || types.length !== 3) {
                throw new Error('Expected an array of three action types.');
            }
            if (!types.every(function (type) {
                return typeof type === 'string';
            })) {
                throw new Error('Expected action types to be strings.');
            }

            /* ???? */
            function actionWith(data) {
                var finalAction = Object.assign({}, action, data);
                delete finalAction[_API.API_INVOKER];
                return finalAction;
            }

            var _types = _slicedToArray(types, 3);

            var requestType = _types[0];
            var successType = _types[1];
            var failureType = _types[2];

            /* ???? */

            next(actionWith({ type: requestType }));

            return callApi(endpoint, data).then(function (response) {
                next(actionWith({
                    response: response,
                    endpoint: endpoint,
                    type: successType
                }));
            }).catch(function (error) {
                if (error && error.status) {
                    if (error.status === 404) {
                        next(_reactRouterRedux.routeActions.replace('/not-found'));
                    } else {
                        next(_reactRouterRedux.routeActions.replace('/error'));

                        next(actionWith({
                            type: failureType,
                            error: error.message
                        }));
                    }
                } else {
                    next(_reactRouterRedux.routeActions.replace('/error'));

                    next(actionWith({
                        type: failureType,
                        error: JSON.stringify(error)
                    }));
                }
            });
        };
    };
};

function create(initialState, historyMiddleware, routeReducer) {
    var reducer = (0, _redux.combineReducers)(Object.assign({}, reducers, {
        routing: routeReducer
    }));

    var store = undefined;
    if (historyMiddleware) {
        store = (0, _redux.applyMiddleware)(logger, api_middleware, historyMiddleware)(_redux.createStore);
    } else {
        store = (0, _redux.applyMiddleware)(logger, api_middleware)(_redux.createStore);
    }

    var finalStore = store(reducer, initialState);
    return finalStore;
}