import React, { PropTypes, Component } from 'react'

class App extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { props: { children } } = this;
        return (
            <div>
            {children}
            </div>
        )
    }
}

export default App