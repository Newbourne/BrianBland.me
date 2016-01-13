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
        config: {
            handler: function(req, rep) {
                rep('')
                // rep.proxy({
                //     host: '',
                //     port: 80,
                //     protocol: 'http',
                //     passThrough: true,
                //     xforward: true
                // });
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