'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var variables = require('./../../app-secrets.json');

process.env.PROTOCOL = variables.server.protocol;
process.env.HOST = variables.server.host;
process.env.PORT = variables.server.port;
process.env.PROXY_HOST = variables.server.proxy.host;
process.env.PROXY_PORT = variables.server.proxy.port;
process.env.PROXY_PREFIX = variables.server.proxy.prefix;

var server = new _hapi2.default.Server();

server.connection({
    host: process.env.HOST,
    port: process.env.PORT || 8080,
    routes: {
        cors: true,
        payload: {
            timeout: 20000 // 20 seconds
        }
    }
});

server.register([{
    // Required for static file/directory routes
    register: require('inert')
}, {
    // Required for view templates
    register: require('vision')
}, {
    // Required for proxy handler
    register: require('h2o2')
}], function (err) {
    if (err) {
        throw err;
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
    });

    server.route(_routes2.default);

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
        console.info('==> ✅  Server is listening');
        console.info('==>   Go to ' + server.info.uri);
    });
});