import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { prepareRoute } from '../../decorators'
import * as Actions from '../../actions/AboutActions'
import marked from 'marked'

@prepareRoute(async function ({ redux, params: { } }) {
    return await * [redux.dispatch(Actions.getData())]
})
@connect(({ AboutReducer }) => ({ AboutReducer }))
class About extends React.Component {
    render () {
        const {
            props: {
                AboutReducer,
                params: { }
            }
        } = this

        const data = AboutReducer.get('data');
        var rawMarkup = marked(data || '', { sanitize: true })

        return (
            <div className='b-article'>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        )
    }
}

export default About