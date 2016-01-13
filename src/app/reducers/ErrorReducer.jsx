import { handleActions } from 'redux-actions'
import marked from 'marked'
import * as C from './../constants/index.jsx'

const initialState = {
    error: null,
    isErrorOpen: false
}

export default handleActions({
    [ C.API_ERROR ]: (state, action) => ({
        isErrorOpen: true,
        error: action.error
    }),
    [ C.ERROR_RESET ]: (state, action) => ({
        isErrorOpen: false,
        errorMsg: null
    })
}, initialState)
