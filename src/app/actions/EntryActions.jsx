import * as C from './../constants/index.jsx'
import { API_INVOKER, API_METHODS } from '../API.jsx'

export function getLatestEntries() {
    return {
        [ API_INVOKER ]: {
            types: [
                C.GET_LATEST_ENTRIES,
                C.GET_LATEST_ENTRIES_SUCCESS,
                C.API_ERROR
            ],
            endpoint: `latest`
        }
    }
}

export function getEntry(key) {
    return {
        [ API_INVOKER ]: {
            types: [
                C.GET_ENTRY,
                C.GET_ENTRY_SUCCESS,
                C.API_ERROR
            ],
            endpoint: key
        }
    }
}
