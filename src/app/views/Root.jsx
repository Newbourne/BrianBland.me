import React, { PropTypes, Component } from 'react'
import { Navigation, Identity, Content } from './../components'

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

export default Root