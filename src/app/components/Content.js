import React, { PropTypes, Component } from 'react'

export default class Content extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className='b-content-con'>
                <div className='b-content'>
                { this.props.children &&
                    React.cloneElement(this.props.children)
                }
                </div>
            </div>
        )
    }
}

Content.propTypes = {
    children: PropTypes.any
}