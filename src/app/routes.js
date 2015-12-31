import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Root, Home } from './views'

export default (
    <Route component={Root}>
    	<Route path='/' component={Home} />
    </Route>
)