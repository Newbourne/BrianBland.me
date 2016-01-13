import request from 'superagent'
import marked from 'marked'

export const API_INVOKER = Symbol('Invoke API')

export function api(route, queryObj) {
    /* Add config variable for dev/prod */
    var apiUrl = process.env.API_URL
    const url = `${apiUrl}/api/${route}`
    
    var req = new Promise(function (resolve, reject) {
            request
                .get(url)
                //.set('Accept', format)
                .query(queryObj)        
                .end(function(err, res) {
                    if (err){
                        reject(res)
                    } else {
                        // read res headers for format
                        resolve(res.text)
                        // if (format == 'json'){
                        //     resolve(res.body)
                        // }
                        // else {
                        //     resolve(marked(res.text))
                        // }
                    }
                })
        })
    return req
}