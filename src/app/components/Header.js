import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className='b-header-con'>
                <header className='b-header'>
                    <div className='b-header-pic'>
                        <a href='#'><img src='assets/Raegan.png' /></a>
                    </div>
                    <div className='b-header-name'>
                        <a href='#'><h1>Brian Bland</h1></a>
                        <p>Software Engineer</p>                        
                    </div>
                    <div className='b-nav-con'>
                        <nav className='b-nav'>
							<Link to='/'>About</Link>
                            (coming soon)
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

Header.propTypes = { }