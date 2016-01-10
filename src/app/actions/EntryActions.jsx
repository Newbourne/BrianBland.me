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
            format: 'json',
            endpoint: `tempJson` /* Get Key from HASTE API */
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
            format: 'markdown',
            endpoint: `temp` /* Get Key from HASTE API */
        }
    }
}
