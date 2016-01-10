import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as EntryActions from './../actions/EntryActions.jsx'

@connect(
    state => ({
        entry: state.EntryReducer.entry
    }), {
        // What is this for? What does it do?
})
export default class Entry extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { dispatch, params } = this.props
        fetch(dispatch, params)
    }
    render() {
        return (
            <div>
                Entry
            </div>
        )
    }
}
Entry.propTypes = {
    dispatch: PropTypes.func.isRequired
}
function fetch(dispatch, params) {
    const actions = bindActionCreators(EntryActions, dispatch)
    actions.getEntry(params.key)
}