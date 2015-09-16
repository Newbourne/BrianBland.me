import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import request from 'superagent';
import qs from 'qs';

import routes from './routes'
import createAPI from '../tools/request'
import createRedux from '../tools/redux'

const history = new BrowserHistory()

const api = createAPI(
  ({ method, headers = {}, pathname, query = {}, body = {} }) => {
    var url = apiURL + pathname
    return request(method, url)
      .query(qs.stringify(query))
      .set(headers)
      .send(body)
  }
);

const initialState = window.__APP_STATE__
const store = createRedux(api, initialState)

React.render(
  <Provider store={store}>
    {() => <Router routes={routes} {...{ history }} />}
  </Provider>,
  document.getElementById('app')
)