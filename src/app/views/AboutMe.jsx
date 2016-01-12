import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AboutMeActions from './../actions/AboutMeActions.jsx'

class AboutMe extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { dispatch, actions } = this.props
        actions.getAboutMeEntry()
    }
    dataFn() {
        const { aboutMeEntry } = this.props
        return {
            __html: aboutMeEntry
        }
    }
    render() {        
        return (
            <div dangerouslySetInnerHTML={ this.dataFn() }>
            </div>
        )
    }
    
    static fetch() {
        return AboutMeActions.getAboutMeEntry()
    }
}
function mapStateToProps(state) {
    return {
        aboutMeEntry: state.AboutMeReducer.aboutMeEntry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AboutMeActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutMe)