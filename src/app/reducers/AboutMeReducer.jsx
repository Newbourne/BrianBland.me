import { handleActions } from 'redux-actions'
import * as C from './../constants'

const initialState = {
    aboutMeEntry: '',
    endpoint: null
}

export default handleActions({
    [ C.GET_ABOUTME_SUCCESS ]: (state, action ) => ({
        aboutMeEntry: action.response,
        endpoint: action.endpoint
    })
}, initialState)