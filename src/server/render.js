import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import create from './../app/store.jsx'
import routes from './../app/routes.jsx'

export default function render (req, rep, layout, { payload }) {
    const title = 'B.BLAND'
    
    /* Universal Implementation */
    /* Server-side Rendering */

    //match({ routes, location: req.url.path }, (error, redirectLocation, renderProps) => {
    //     //console.log('inside of match', req.url, renderProps)
    //     // if (error) {
    //     //     rep.status(500).send(error.message)
    //     // } else if (redirectLocation) {
    //     //     rep.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //     // } else if (renderProps) {
    //         console.log('renderProps', renderProps)
    //         let store = create({})
    //         let body = renderToString(
    //             <Provider store={store}>
    //                 {() => <RouterContext {...renderProps} /> }
    //             </Provider>)
    //         let state = {}
    //         console.log('body', body)
    //         rep.view(layout, { title, body, state })
    //     // } else {
    //     //     rep.status(404).send('Not found')
    //     // }
    // })
    
    rep.view(layout, { title })
}
