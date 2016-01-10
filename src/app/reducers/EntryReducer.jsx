import _ from 'lodash'
import marked from 'marked'
import * as C from './../constants/index.jsx'

const initialState = {
    entry: ''
}

const actionsMap = {
    [ C.GET_ENTRY_SUCCESS ]: (state, action) => ({
        entry: marked(action.response)
    })
}

export default function EntryReducer(state = initialState, action) {
    const reduceFn = actionsMap[ action.type ]

    if (!reduceFn) {
        return state
    }

    const newState = Object.assign({ }, state, reduceFn(state, action))
    return newState
}
