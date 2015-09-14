import { createStore, applyMiddleware } from 'redux'
import _ from 'lodash'
//import promiseMiddleware from 'redux-promise'
import reducers from '../app/reducers';

function promiseMiddleware (api, getState) {
    return next =>
        function _r (action) {
            if (action && _.isFunction(action.then)) {
                return action.then(_r)
            }

            if (_.isFunction(action)) {
                return _r(action(api, getState))
            }

            return next(action)
        }
}

export default function (api, initialState) {
    const store = applyMiddleware(getState => promiseMiddleware(api, getState))(createStore)
    var finalStore = store(reducers, initialState)
    return finalStore  
}