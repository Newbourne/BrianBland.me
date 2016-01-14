import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class Error extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        const { error, dispatch } = this.props
        if (!error || error.lengh > 0) {
            dispatch(pushPath('/'))
        }
    }
    render() {
        const { error } = this.props
        return (
            <div>
                <h2>Ah man, I'm so sorry!</h2>
                <p>An unexpected error has occurred. Hopefully, this has been 
                reported and I will be able to fix in a timely fashion. </p>
                <p>
                    { error }
                </p>
            </div>                
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.ErrorReducer.error
    }
}

export default connect(
  mapStateToProps,
  null
)(Error)