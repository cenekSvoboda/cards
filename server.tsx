const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();


app.use('/resetDB', (req, res) => {

    let db = new sqlite3.Database('./cards.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the cards database.');
    });


    let sql = `
    CREATE TABLE IF NOT EXISTS contacts (
	contact_id INTEGER PRIMARY KEY,
	shorthand TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	token TEXT,
	name TEXT NOT NULL,
	phone TEXT,
	optional1 TEXT,
	optional2 TEXT,
	url TEXT
);

`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });

    db.close();


    let db2 = new sqlite3.Database('./cards.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the cards database.');
    });
    let sql2 = `
    
INSERT INTO contacts (
	shorthand,
	email,
	password,
	token,
	name,
	phone,
	optional1,
	optional2,
	url
)
VALUES(
'admin',
'svobo.c@gmail.com',
'admin',
'',
'Admin Adminovic',
'666666666',
'Hell Lane 1',
'Hell',
'http://ceneksvoboda.eu'
);`;

    db2.all(sql2, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });

    db2.close();
    res.send("reset");
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors());

app.use('/login', (req, res) => {
    //console.log(req.body.username);
    //console.log(req.body.password);
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => {console.log('API is running on http://localhost:8080/login');console.log('RESET DB on http://localhost:8080/resetDB')});