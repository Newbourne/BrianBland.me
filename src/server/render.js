import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { match, Router, RouterContext, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { pushPath, routeReducer } from 'redux-simple-router'
import _ from 'lodash'
import serialize from 'serialize-javascript'

import create from './../app/store.jsx'
import routes from './../app/routes.jsx'
import App from './../app/views/App.jsx'

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
    match({ routes, location: req.url.path }, (error, redirectLocation, renderProps) => {
        if (error) {
            console.log('hit error')
            rep.status(500).send(error.message)
        } else if (redirectLocation) {
            console.log('hit redirection')
            rep.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            let store = create({}, routeReducer)
            let body = ''
            let state = '{}'
            
            /* Loop through+chain components.fetch() */
            // We want to use store.dispatch to fire static actions
            all(getFetchFuncs(renderProps.components, req.url.path.substring(1)), store)
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
                   rep.view(layout, { title, body, state })
               })
        } else {
            rep.status(404).send('Not found')
        }
    })
}