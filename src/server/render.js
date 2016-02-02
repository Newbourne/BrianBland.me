import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { match, Router, RouterContext, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import { routeActions, routeReducer } from 'react-router-redux'

import _ from 'lodash'
import serialize from 'serialize-javascript'

import create from './../app/store'
import routes from './../app/routes'
import App from './../app/views/App'

const serverSideRenderEnabled = true

// Collects all static fetch functions from components
var getFetchFuncs = (components, path) => {
    var accumulator = []
    _.forEach(components, function(component) {
        if (component.fetch){
            if (component.displayName === 'Connect(Entry)') {
                accumulator.push(component.fetch(path))
            }
            else {
                accumulator.push(component.fetch())                
            }
        }
    })
    return accumulator
}

// https://www.promisejs.org/patterns/
// modified Promises.All()
var all = (promises, store) => {
    var accumulator = [];
    var ready = Promise.resolve(null);
    
    promises.forEach(function (po) {
        ready = ready.then(function () {
            return store.dispatch(po)
        }).then(function (value) {
            accumulator.push(value)
        })
    })

    return ready.then(function () { return accumulator; })
}

export default function render (req, rep, layout) {
    const title = 'B.BLAND'

    /* Universal Implementation */
    /* Server-side Rendering */
    if (serverSideRenderEnabled) {
        match({ routes, location: req.url.path }, (error, redirectLocation, renderProps) => {
            if (error) {
                throw new Error('hit error')
            } else if (redirectLocation) {
                throw new Error('hit redirection')
            } else if (renderProps) {
                let body = ''
                let state = {}
                
                const store = create({}, null, routeReducer)
                
                /* Loop through+chain components.fetch() */
                // We want to use store.dispatch to fire static actions
                var componentChain = getFetchFuncs(renderProps.components, req.url.path.substring(1))
                
                all(componentChain, store)
                .then(() => {
                        body = renderToString(
                            <Provider store={store}>
                                <RouterContext {...renderProps} />
                            </Provider>)
                            
                        state = serialize(store.getState())                       
                        
                        rep.view(layout, { title, body, state })
                })
                .catch((error) => {
                    console.log('promise error ', error)
                    rep.view(layout, { title, state })
                })
            } else {
                throw new Error('hit not found')
            }
        })        
    } else {
        let state = serialize({})
        rep.view(layout, { title, state })
    }
}