const config  = require('./model/config'),
      restify = require('restify'),
      corsMiddleware = require('restify-cors-middleware'),
      jwt = require('jsonwebtoken');

/* cross origin http */
const cors = corsMiddleware( { origins: ['http://127.0.0.1:5500'] } );
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url     : config.hostname
});


const db = config.db.get();
config.db.open(db);


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
    try {

        db.one('SELECT * FROM _token WHERE name = $1 AND password = $2', [ req.body.name, req.body.password ])
            .then((results) => {

                console.log(JSON.stringify(results)); /* { "id" : 1, "name" : "u4bi", "password" : "u4bi-password", "pay" : 1256.233, "age" : 17 } */
                
                delete results.id;
                delete results.password;

                jwt.sign(
                    { ...results }, // payload
                    config.jwt.secret,
                    {
                        algorithm: 'HS256',
                        expiresIn : 60
                        // notBefore : 30
                    },
                    (err, token) => res.send({ token : token })
                );

            })
            .catch((error) => res.end());

    } catch(e) {
        res.end();
    }
});


server.post('/token', (req, res) => {

});

server.listen(7778, () => console.log(server.name, server.url));