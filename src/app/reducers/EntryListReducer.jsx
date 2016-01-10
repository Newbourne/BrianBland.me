import _ from 'lodash'
import marked from 'marked'
import * as C from './../constants/index.jsx'

const initialState = {
    entries: []
}

const actionsMap = {
    [ C.GET_LATEST_ENTRIES_SUCCESS ]: (state, action) => ({
        entries: action.response
    })
}

export default function EntryListReducer(state = initialState, action) {
    const reduceFn = actionsMap[ action.type ]

    if (!reduceFn) {
        return state
    }

    const newState = Object.assign({ }, state, reduceFn(state, action))
    return newState
}
