import request from 'superagent'
import marked from 'marked'

export const API_INVOKER = Symbol('Invoke API')

export function api(route, queryObj, format) {
    /* Add config variable for dev/prod */
    const url = `http://localhost:8080/api/${route}`
    
    if (!format) {
        format = 'application/json' // default to json
    } else {
        switch(format){
            case 'json':
                format = 'application/json'
                break;
            case 'markdown':
                format = 'text/markdown'
                break;
        }
    }

    var req = new Promise(function (resolve, reject) {
            request
                .get(url)
                .set('Accept', format)
                .query(queryObj)        
                .end(function(err, res) {
                    if (err){
                        reject(err)
                    } else {
                        if (format == 'json'){
                            resolve(res.body)
                        }
                        else {
                            resolve(marked(res.text))
                        }
                    }
                })
        })
    return req
}