import React from 'react'
//import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'

import createBrowserHistory from 'history/lib/createBrowserHistory'

import routes from './routes'
import create from './store'
//import injectTapEventPlugin from 'react-tap-event-plugin'

//injectTapEventPlugin()

const store = create({})

const history = createBrowserHistory()
	// <Provider store={store}>
 //    	{() => <Router routes={routes} {...{ history }} />}
 //  	</Provider>,
ReactDOM.render(
	<Router routes={routes} {...{ history }} />,
  	document.getElementById('app')
)