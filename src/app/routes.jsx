import React from 'react'
import { Router, Route, Redirect, IndexRoute } from 'react-router'
import { Root, Home, AboutMe, Entry } from './views/index.jsx'

export default (
    <Route path='/' component={Root}>
        <IndexRoute component={Home}/>
        <Route path='me' component={AboutMe}/>
        <Route path=':key' component={Entry}/>
        <Route path='*' component={Home}/>    
    </Route>
)
