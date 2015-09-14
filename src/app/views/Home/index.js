import React, { PropTypes, Component } from 'react'

export default class Home extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <main className='b-article-main'>
                <article>
                    <header>
                        <h1>Home</h1>
                    </header>
                    <div className='b-article-body'>
                        <p>
                            Sample Content
                        </p>
                        <h2>Sub-Title</h2>
                        <p>
                            Sample Content
                        </p>                        
                    </div>
                    <footer className='b-article-footer'>
                    </footer>
                </article>
            </main>
        )
    }
}

Home.propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}