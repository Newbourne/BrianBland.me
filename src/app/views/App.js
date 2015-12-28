import React, { PropTypes, Component } from 'react'

import { Header } from './../components'

class App extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { props: { children } } = this;
        return (
            <div>
                { children }
            </div>
        )
    }
}

export default App