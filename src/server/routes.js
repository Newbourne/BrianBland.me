import path from 'path'
import render from './render'

export default [
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
        path: '/{param*}',
        config: {
            handler: function (req, rep) {   
                render(req, rep, 'default', {})
            }
        }
    }
];