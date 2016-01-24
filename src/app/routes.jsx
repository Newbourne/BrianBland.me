import React from 'react'
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import { App, Root, Home, AboutMe, Entry, Error, NotFound } from './views'

export default (
    <Route component={App}>
        <Route path='/' component={Root}>
            <IndexRoute component={AboutMe}/>
            <Route path='me' component={AboutMe}/>
            <Route path='error' component={Error}/>
            <Route path='not-found' component={NotFound}/>
            <Route path=':key' component={AboutMe}/>
            <Route path='*' component={AboutMe}/>    
        </Route>
    </Route>
)