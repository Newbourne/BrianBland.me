import request from 'superagent'

export const API_INVOKER = Symbol('Invoke API')

export function api(route, queryObj) {
    const url = `http://localhost:8080/${route}`

    var req = new Promise(function (resolve, reject) {
            request
                .get(url)
                .set('Accept', 'application/json')
                .query(queryObj)        
                .end(function(err, res) {
                    if (err){
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
        })
    return req
}