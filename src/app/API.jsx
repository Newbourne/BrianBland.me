import request from 'superagent'
import marked from 'marked'
import Remarkable from 'remarkable'
var md = new Remarkable('commonmark');

export const API_INVOKER = Symbol('Invoke API')

export function api(route, queryObj) {
    var apiHost = process.env.API_HOST
    var apiPort = process.env.API_PORT
    
    const url = `http://${apiHost}:${apiPort}/api/${route}`
    
    var req = new Promise(function (resolve, reject) {
            request
                .get(url)
                .query(queryObj)        
                .end(function(err, res) {
                    if (err){
                        reject(err)
                    } else {
                        // read res headers for format
                        // look for markdown
                        // default to json
                        var contentType = res.header["content-type"]
                        if (contentType && contentType == "text/markdown; charset=utf-8"){
                            resolve(md.render(res.text)) 
                        }
                        else {
                            resolve(res.body) 
                        }
                    }
                })
        })
    return req
}