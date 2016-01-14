import request from 'superagent'
import marked from 'marked'

export const API_INVOKER = Symbol('Invoke API')

export function api(route, queryObj) {
    var apiUrl = process.env.API_URL
    var apiPort = process.env.API_PORT
    
    const url = `${apiUrl}:${apiPort}/api/${route}`
    
    var req = new Promise(function (resolve, reject) {
            request
                .get(url)
                .query(queryObj)        
                .end(function(err, res) {
                    if (err){
                        reject(err)
                    } else {
                        // read res headers for format
                        resolve(res.text)
                        // resolve(res.body) json
                        // resolve(marked(res.text)) markdown
                    }
                })
        })
    return req
}
