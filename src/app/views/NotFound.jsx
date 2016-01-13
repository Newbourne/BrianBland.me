import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class NotFound extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        
    }
    render() {        
        return (
            <div>
                <h1>Not Found!</h1>
            </div>
        )
    }
}