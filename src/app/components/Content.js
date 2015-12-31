import React, { PropTypes, Component } from 'react'

export default class Content extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { props: { children } } = this;
        return (
            <div className='content'>
                { children }
            </div>
        )
    }
}

Content.propTypes = {
    children: PropTypes.any
}