import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                    <div>
                        <a href='#'><h1>Brian Bland</h1></a>
                        <p>Software Engineer</p>                        
                    </div>
                    <div>
                        <nav>
							<Link to='/'>About</Link>
                            (coming soon)
                        </nav>
                    </div>
            </div>
        )
    }
}

Header.propTypes = { }