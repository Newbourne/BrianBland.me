import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import { api, API_INVOKER } from './API'
import * as reducers from './reducers'

import { routeActions } from 'redux-simple-router'

/* eslint no-console: 0 */
const logger = store => next => action => {
    if (process.env.NODE_ENV !== 'production' && process.env.CLIENT) {
        let type = action[ API_INVOKER ]
        if (typeof type === 'undefined') {
            type = action.type
        }
        else {
            type = type.types[ 0 ]
        }
        console.group(type)
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        console.groupEnd(type)
        return result
    }
    else {
        return next(action)
    }
}

function callApi(endpoint, data) {
    return api(endpoint, data)
}

/* Visit later for cleanup */
const api_middleware = store => next => action => {
    const callAPI = action[ API_INVOKER ]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const { types, endpoint } = callAPI
    let { data } = callAPI

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    /* ???? */
    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[ API_INVOKER ]
        return finalAction
    }

    const [requestType, successType, failureType] = types

    /* ???? */
    next(actionWith({ type: requestType }))

    return callApi(endpoint, data)
        .then(function(response){
            next(actionWith({
                response,
                endpoint,
                type: successType
            }))
        })
        .catch(function(error) {
            if (error && error.status) {
                if (error.status === 404) {
                    next(routeActions.replace('/not-found'))
                } else {
                    next(routeActions.replace('/error'))
                    
                    next(actionWith({
                        type: failureType,
                        error: error.message
                    }))                      
                }          
            }
            else {
                next(routeActions.replace('/error'))
                
                next(actionWith({
                    type: failureType,
                    error: JSON.stringify(error)
                }))
            }
        })
}

export default function create(initialState, historyMiddleware, routeReducer) {
    const reducer = combineReducers(Object.assign({}, reducers, { 
        routing: routeReducer 
    }))
    
    let store
    if (historyMiddleware) {
        store = applyMiddleware(logger, api_middleware, historyMiddleware)(createStore)
    } else {
        store = applyMiddleware(logger, api_middleware)(createStore)
    }
    
    var finalStore = store(reducer, initialState)
    return finalStore        
}