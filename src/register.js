import handlebars from 'handlebars';
import routes from './server/routes';

function register(server, options, next){
    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './server/views',
        layoutPath: './server/views/layouts',
        layout: 'index',
        isCached: true
    });
    
    server.route(routes);

    next();
}

register.attributes = {
    name: 'client',
    version: '0.0.1'
};

export default register;