import Hapi from 'hapi'
import routes from './server/routes'
import commandLineArgs from 'command-line-args'

var cli = commandLineArgs([
    { name: 'production', alias: 'p', type: Boolean }
])

var options = cli.parse()

if (!options.production) {
    process.env.NODE_ENV = 'development'
    process.env.API_URL = 'http://localhost:8080'
}
else {
    process.env.NODE_ENV = 'production'
    process.env.API_URL = 'http://brianbland.me'
}

var server = new Hapi.Server()

server.connection({
    host: '0.0.0.0',
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
    }],
    function(err) {
    if (err) {
        throw err
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './server/views',
        layoutPath: './server/views/layouts',
        layout: 'index',
        isCached: process.env.NODE_ENV === 'production' ? true : false
    })

    server.route(routes)

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri)
        console.info('==> ✅  Server is listening')
        console.info('==>   Go to ' + server.info.uri)
    })
});