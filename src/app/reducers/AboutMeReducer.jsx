import _ from 'lodash'
import marked from 'marked'
import * as C from './../constants/index.jsx'

const initialState = {
    aboutMeEntry: ''
}

const actionsMap = {
    [ C.GET_ABOUTME_SUCCESS ]: (state, action) => ({
        aboutMeEntry: marked(action.response)
    })
}

export default function AboutMeReducer(state = initialState, action) {
    const reduceFn = actionsMap[ action.type ]

    if (!reduceFn) {
        return state
    }

    const newState = Object.assign({ }, state, reduceFn(state, action))
    return newState
}