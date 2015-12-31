import React, { PropTypes, Component } from 'react'

export default class Identity extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className='identity'>
                Brian Bland
            </div>
        )
    }
}