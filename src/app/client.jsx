import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, RouterContext, browserHistory } from 'react-router'

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import routes from './routes.jsx'
import create from './store.jsx'

// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

const state = window.__STATE__
const store = create(state, routeReducer)

syncReduxAndRouter(browserHistory, store)

import { Root } from './views/Root.jsx'

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes} 
        />
    </Provider>,
  	document.getElementById('app')
)