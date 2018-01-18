const config  = require('./model/config'),
      restify = require('restify'),
      corsMiddleware = require('restify-cors-middleware');

/* cross origin http */
const cors = corsMiddleware( { origins: ['http://127.0.0.1:5500'] } );
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url     : config.hostname
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);
server.use((req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});


server.post('/user', (req, res) => {

});


server.post('/token', (req, res) => {

});

server.listen(7778, () => console.log(server.name, server.url));