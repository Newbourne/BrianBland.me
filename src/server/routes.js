import path from 'path'
import render from './render'

export default [
    {
        method: '*',
        path: '/icon/{param*}',
        handler: {
			directory: {
				path: path.normalize(__dirname + './../../icon/'),
				listing: true
			}
        }
    },
	{
		method: 'GET',
		path: '/assets/{param*}',
		handler: {
			directory: {
				path: path.normalize(__dirname + './../../dist/'),
				listing: true
			}
		} 
	},   
    {
        method: '*',
        path: '/api/{path*}',
        handler: {
            proxy: {
                passThrough: true,
                xforward: true,
                mapUri: function (request, callback) {
                    var proxyUrl = `http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}${process.env.PROXY_PREFIX}`
                    callback(null, proxyUrl + request.params.path);
                }
                // See ho2o for more on proxy API.  
            }
        }            
    },  
    {
        method: '*',
        path: '/{path*}',
        config: {
            handler: function (req, rep) {   
                render(req, rep, 'default')
            }
        }
    }
];