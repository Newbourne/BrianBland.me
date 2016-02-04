import Hapi from 'hapi'
import routes from './routes'

var variables = require('./../../app-secrets.json')

process.env.PROTOCOL = variables.server.protocol
process.env.HOST = variables.server.host
process.env.PORT = variables.server.port
process.env.PROXY_HOST = variables.server.proxy.host
process.env.PROXY_PORT = variables.server.proxy.port
process.env.PROXY_PREFIX = variables.server.proxy.prefix
    
var server = new Hapi.Server()

server.connection({
    host: process.env.HOST,
    port: process.env.PORT || 8080,
    routes:{
        cors: true,
        payload:{
            timeout: 20000 // 20 seconds
        }
    }
})

server.register([{
        // Required for static file/directory routes
        register: require('inert')
    },{
        // Required for view templates
        register: require('vision')
    }, {
        // Required for proxy handler
        register: require('h2o2')
    }],
    (err) => {
        if (err) {
            throw err
        }

        server.views({
            engines: {
                hbs: require('handlebars')
            },
            relativeTo: __dirname,
            path: './views',
            layoutPath: './views/layouts',
            layout: 'index',
            isCached: process.env.NODE_ENV === 'production' ? true : false
        })

        server.route(routes)

        server.start(() => {
            server.log('info', 'Server running at: ' + server.info.uri)
            console.info('==> ✅  Server is listening')
            console.info('==>   Go to ' + server.info.uri)
        })
});