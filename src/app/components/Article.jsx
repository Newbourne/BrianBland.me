import React, { PropTypes, Component } from 'react'

export default class Article extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                { this.props.children &&
                    React.cloneElement(this.props.children)
                }
            </div>
        )
    }
}

Article.propTypes = {
    children: PropTypes.any
}