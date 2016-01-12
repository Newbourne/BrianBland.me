import { handleActions } from 'redux-actions'
import * as C from './../constants/index.jsx'

const initialState = {
    aboutMeEntry: ''
}

export default handleActions({
    [ C.GET_ABOUTME_SUCCESS ]: (state, action ) => ({
        aboutMeEntry: action.response
    })
}, initialState)