import Hapi from 'hapi'
import path from 'path'

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

server.register([
        {
            register: require('./../register.js'),
            options: { }
        }        
    ],
    { },
    function (err) {
        if (err) {
            throw err
        }

        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri)
            console.info('==> ✅  Server is listening')
            console.info('==>   Go to ' + server.info.uri)
        })
    }
)