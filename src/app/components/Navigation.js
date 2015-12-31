import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Navigation extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: false
        }
    }
    render() {
        return (
            <div className='nav-container'>
                <div className='nav-item'>
                    B
                </div>
            </div>
        )
    }
}

Navigation.propTypes = { }