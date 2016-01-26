import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AboutMeActions from './../actions/AboutMeActions'

// Temporary
import Remarkable from 'remarkable'
var md = new Remarkable('commonmark');

const tempInfo = `
# Brian Bland

Google Go and Node enthusiast in the Cincinnati market. I grind the Microsoft .NET
stack in the daylight but prefer working with open source technologies. 

I see you ASP.NET 5, I like it.

### Mission

I have several research projects that I want to start. My mission is to utilize
 this platform to discuss and share my progress. Everything I do will be available on my [GitHub](https://github.com/Newbourne) account.
 
Check back later for more updates.
`
class AboutMe extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        // const { dispatch, aboutMeEntry, actions } = this.props
        // if (!aboutMeEntry || aboutMeEntry.length == 0) {
        //     actions.getAboutMeEntry()
        // }
    }
    dataFn() {
        const { aboutMeEntry } = this.props
        return {
            __html: md.render(tempInfo)
        }
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={ this.dataFn() }>
            </div>
        )
    }
    
    static fetch() {
        return AboutMeActions.getAboutMeEntry()
    }
}
function mapStateToProps(state) {
    return {
        aboutMeEntry: state.AboutMeReducer.aboutMeEntry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AboutMeActions, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutMe)