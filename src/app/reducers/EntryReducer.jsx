import { handleActions } from 'redux-actions'
import * as C from './../constants'

const initialState = {
    entry: null,
    endpoint: null
}

export default handleActions({
    [ C.GET_ENTRY_SUCCESS ]: (state, action) => ({
        entry: action.response,
        endpoint: action.endpoint
    })
}, initialState)
