## node postgreSQL jwt

### server
```
npm install
npm start
```

### client(CORS)
```
http://127.0.0.1:5500/client/index.html
```

### API
| URL                       | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /user                     | POST   | token sign                |
| /token/:key               | GET    | verify token              |

### Table
```sql
CREATE TABLE _token (
    id SERIAL PRIMARY KEY,
    name varchar(32),
    password varchar(32),
    pay double precision,
    age integer
);

INSERT INTO 
    _token (
        name, 
        password, 
        pay, 
        age
    ) 
    VALUES(
        'u4bi', 
        'u4bi-password',
        1256.233,
        17
    );
```

> requirements
> * jsonwebtoken
> * pg-promise
> * restify
> * restify-cors-middleware
> * axios (client)