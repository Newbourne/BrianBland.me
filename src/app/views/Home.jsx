import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as EntryActions from './../actions/EntryActions'

class Home extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { dispatch } = this.props
        const actions = bindActionCreators(EntryActions, dispatch)
        actions.getLatestEntries()
    }
    render() {
        const { entries } = this.props
        return (
            <div> 
                Do something with entries array                     
            </div>
        )
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        entries: state.EntryListReducer.entries
    }
}
export default connect(mapStateToProps)(Home)