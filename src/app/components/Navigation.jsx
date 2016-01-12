import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'

class Navigation extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: false
        }
    }
    goHome() {
        const { dispatch } = this.props
        dispatch(pushPath('/'))
    }
    render() {
        return (
            <div className='nav-container'>
                <div className='nav-item'>
                    <div className='b-icon' onClick={this.goHome.bind(this)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 600">
                    <path className='b-base' d="M299.24,94.63c1.15,40.09,7.77,79.8,14.37,119.35l58.16,348.33"/>
                    <path className='b-curves' d="M345.17,95a134.65,134.65,0,0,1,45.52-59.09c7-5.14,15-9.72,23.66-10.07,14.83-.59,27.76,11.8,32.36,25.91s2.63,29.46-.25,44A378.45,378.45,0,0,1,328.61,302.53c16.79-34.08,55.5-52.11,93.05-57.89,29-4.47,60-2.86,85.71,11.2,49.12,26.82,65.61,92.67,52.27,147-11.17,45.51-40.47,87-81.52,109.63s-93.6,24.72-134.76,2.33"/>
                    </svg>
                    </div>
                </div>
            </div>
        )
    }
}
Navigation.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect()(Navigation)