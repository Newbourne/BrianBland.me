import React, { PropTypes, Component } from 'react'
import { Navigation, Identity, Content } from './../components/index.jsx'

class Root extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { props: { children } } = this;
        return (
            <div className='root'>
                <Content>
                    <Identity />
                    {children}
                </Content>
                <Navigation />
            </div>
        )
    }
}

Root.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Root