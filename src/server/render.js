import React from 'react'
import { Router as ReactRouter } from 'react-router'
import Location from 'react-router/lib/Location'
import History from 'react-router/lib/MemoryHistory'
import { Provider } from 'react-redux'
import request from 'superagent'
import qs from 'qs'

import createRedux from '../tools/redux'
import createAPI from '../tools/request'
import routes from '../app/routes'
import AppRouter from '../app/components/Router'

export default function render (req, rep, layout, { payload }) {
    const { path, query } = req;
    const location = new Location(path, query);
    const history = new History(path);

    const api = createAPI(
        ({ method, headers = {}, pathname, query = {}, body = {} }) => {
          var url = process.env.API_URL + pathname
          return request(method, url)
            .query(qs.stringify(query))
            .set(headers)
            .send(body);
        }
    );

    const store = createRedux(api)

    ReactRouter.run(routes, location, async (err, routerState) => {
        try {

            if (err) {
                console.log('error immediately')
                throw err
            }

            const title = 'B.BLAND'

            const { params, location } = routerState
            const prepareRouteMethods =
                routerState.components.map(component =>
                                           component.prepareRoute)

            for (let prepareRoute of prepareRouteMethods) {
                if (!prepareRoute) {
                    continue
                }
                await prepareRoute({ store, params, location })
            }

            const body = React.renderToStaticMarkup(
                <Provider store={store}>
                  {() => <AppRouter {...{ ...routerState, location, history }} />}
                </Provider>
            )

            const state = JSON.stringify(store.getState())

            rep.view(layout, { title, state, body })
        }
        catch(err) {
            console.log('err', err.stack)
            rep.redirect('/')
        }
    });
}