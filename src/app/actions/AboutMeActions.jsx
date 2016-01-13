import * as C from './../constants/index.jsx'
import { API_INVOKER, API_METHODS } from '../API.jsx'

export function getAboutMeEntry() {
    return {
        [ API_INVOKER ]: {
            types: [
                C.GET_ABOUTME,
                C.GET_ABOUTME_SUCCESS,
                C.API_ERROR
            ],
            endpoint: 'me'
        }
    }
}
