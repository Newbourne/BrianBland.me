import * as C from './../constants/index.jsx'

const initialState = {
    errorMsg: '',
    isErrorOpen: false
}

const actionsMap = {
    [ C.API_ERROR ]: (state, action) => ({
        isErrorOpen: true,
        errorMsg: action.error
    }),
    [ C.ERROR_RESET ]: (state, action) => ({
        isErrorOpen: false,
        errorMsg: ''
    })
}

export default function ErrorReducer(state = initialState, action) {
    const reduceFn = actionsMap[ action.type ]

    if (!reduceFn) {
        return state
    }

    const newState = Object.assign({ }, state, reduceFn(state, action))
    return newState
}