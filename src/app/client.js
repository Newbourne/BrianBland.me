import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'

import createBrowserHistory from 'history/lib/createBrowserHistory'

import routes from './routes'
import create from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const store = create({})

const history = createBrowserHistory()

ReactDOM.render(
	<Provider store={store}>
    	{() => <Router routes={routes} {...{ history }} />}
  	</Provider>,
  	document.getElementById('app')
)