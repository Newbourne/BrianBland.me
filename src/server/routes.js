import path from 'path'
import render from './render'

var favIconPath = path.join(__dirname, './../../data/favicon.ico')

export default [
    {
        method: '*',
        path: '/favicon.ico',
        config: {
            handler: function (req, rep) {
                rep.file(favIconPath)
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
        path: '/api/temp',
        config: {
            handler: function(req, rep) {
                rep(`
                # TEMP TITLE
                
                ### Temp Section
                
                Sample Information This is on the route. Temp API Data
                
                ### Temp Section
                
                Data...
                `)
            }
        }
    },
    {
        method: '*',
        path: '/api/tempJson',
        config: {
            handler: function(req, rep) {
                rep({dummy:true})
            }
        }
    },      
    {
        method: '*',
        path: '/api/{path*}',
        config: {
            handler: function(req, rep) {
                rep.proxy({
                    host: '',
                    port: 80,
                    protocol: 'http',
                    passThrough: true,
                    xforward: true
                });
            }
        }
    },  
    {
        method: '*',
        path: '/{path*}',
        config: {
            handler: function (req, rep) {   
                render(req, rep, 'default', {})
            }
        }
    }
];