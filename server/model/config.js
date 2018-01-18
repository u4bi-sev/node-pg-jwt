const pgp = require('pg-promise')();

module.exports = {
    name: 'rest-pg-jwt',
    version: '0.0.1',
    db: {
        get : () => pgp({
            host     : 'localhost',
            user     : '',
            password : '',
            database : '',
        }),
        open : (con) => con.connect((error) => { throw error; })
    }
 }