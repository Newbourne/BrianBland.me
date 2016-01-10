import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AboutMeActions from './../actions/AboutMeActions.jsx'

// @connect(
//     state => ({
//         aboutMeEntry: state.AboutMeReducer.aboutMeEntry
//     }), {
//         // ?
// })
class AboutMe extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { dispatch } = this.props
        fetch(dispatch)
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
}
AboutMe.propTypes = {
    dispatch: PropTypes.func.isRequired
}
function fetch(dispatch) {
    const actions = bindActionCreators(AboutMeActions, dispatch)
    actions.getAboutMeEntry()
}
function mapStateToProps(state) {
  return {
    aboutMeEntry: state.AboutMeReducer.aboutMeEntry
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(TodoActions, dispatch)
//   }
// }

export default connect(
  mapStateToProps,
  //mapDispatchToProps
)(AboutMe)