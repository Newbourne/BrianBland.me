import ActionTypes from '../constants'

export function getData() {
    return async api => ({
        type: ActionTypes.About.getData,
        res: await api(`/api/about.md`)
    })
}