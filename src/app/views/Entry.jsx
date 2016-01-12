import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as EntryActions from './../actions/EntryActions.jsx'

class Entry extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { dispatch, params, actions } = this.props
        actions.getEntry(params.key)
    }
    dataFn() {
        const { entry } = this.props
        return {
            __html: entry
        }
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={ this.dataFn() }>
            </div>
        )
    }
    static fetch(id) {
        return EntryActions.getEntry(id)
    }
}

function mapStateToProps(state) {
    return {
        entry: state.EntryReducer.entry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(EntryActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry)