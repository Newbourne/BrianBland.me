import React, { PropTypes, Component } from 'react'

import { Header, Content } from './../components'

class App extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { props: { children } } = this;
        return (
            <div>
                <Header />
                <Content>
                    { children }
                </Content>
            </div>
        )
    }
}

export default App