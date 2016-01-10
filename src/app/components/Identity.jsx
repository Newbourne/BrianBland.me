import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Identity extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className='identity'>
                <Link to='/me'>Brian Bland</Link>
            </div>
        )
    }
}