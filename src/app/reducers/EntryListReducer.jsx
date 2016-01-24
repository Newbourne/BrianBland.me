import _ from 'lodash'
import { handleActions } from 'redux-actions'
import marked from 'marked'
import * as C from './../constants'

const initialState = {
    entries: []
}

export default handleActions({
    [ C.GET_LATEST_ENTRIES_SUCCESS ]: (state, action) => ({
        entries: action.response
    })
}, initialState)