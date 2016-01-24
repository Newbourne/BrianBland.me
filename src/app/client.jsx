import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import { syncHistory, routeReducer } from 'react-router-redux'

import routes from './routes.jsx'
import create from './store.jsx'

const historyMiddleware = syncHistory(browserHistory)

const state = window.__STATE__
const store = create(state, historyMiddleware, routeReducer)

historyMiddleware.listenForReplays(store);

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes} 
        />
    </Provider>,
  	document.getElementById('app')
)