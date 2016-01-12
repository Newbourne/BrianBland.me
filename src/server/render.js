import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import { match, Router, RouterContext, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { pushPath, routeReducer } from 'redux-simple-router'

import create from './../app/store.jsx'
import routes from './../app/routes.jsx'
import App from './../app/views/App.jsx'

export default function render (req, rep, layout, { payload }) {
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
            store.dispatch(renderProps.components[2].fetch())
               .then(() => {
                    body = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>)
                        
                    // need javascript serialization
                    state = JSON.stringify(store.getState())
                    
                    rep.view(layout, { title, body, state })
                })
        } else {
            rep.status(404).send('Not found')
        }
    })
}