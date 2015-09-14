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
  /**
 * Client's createRequest() method
 */
  ({ method, headers = {}, pathname, query = {}, body = {} }) => {
    var url = `http://localhost:8080/${pathname}`;
    return request(method, url)
      .query(qs.stringify(query))
      .set(headers)
      .send(body);
  }
);

const redux = createRedux(api, __APP_STATE__);

console.log('client', redux)

React.render(
  <Provider store={redux}>
    {() => <Router {...{ history }} />}
  </Provider>,
  document.getElementById('app')
)