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
                rep('# TEMP TITLE \n ### Temp Section \n Temp Data, blah blah blah')
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