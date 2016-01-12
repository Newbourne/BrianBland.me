import { handleActions } from 'redux-actions'
import marked from 'marked'
import * as C from './../constants/index.jsx'

const initialState = {
    entry: null
}

export default handleActions({
    [ C.GET_ENTRY_SUCCESS ]: (state, action) => ({
        entry: action.response
    })
}, initialState)
