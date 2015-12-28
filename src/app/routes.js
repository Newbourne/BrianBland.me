import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { App, Home } from './views'

export default (
    <Route component={App}>
    	<Route path='/' component={Home} />
    </Route>
)