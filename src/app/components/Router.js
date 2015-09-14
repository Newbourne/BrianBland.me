import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import routes from '../routes';

class AppRouter extends Component {

    render() {
        return (
            <Router {...this.props}>
                {routes}
            </Router>
        )
    }
}

AppRouter.propTypes = {
    history: PropTypes.object.isRequired
}

export default AppRouter