const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')
const Database = require('sqlite-async');


app.use('/resetDB', async (req, res) => {

    try {
        db = await Database.open('./cards.db');
    } catch (E) {
        console.log("Cant connect");
    }

    await db.run(`
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
    `);

    const delString = `
           DELETE FROM contacts WHERE TRUE;
        `;
    await db.run(delString);

    const insertString = `
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
        ?,
        'Admin Adminovic',
        '666666666',
        'Hell Lane 1',
        'Hell',
        'http://ceneksvoboda.eu'
    );
        `;
    await db.run(insertString, '');

    const insertString2 = `
    
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
        'admasdfin',
        'svoasfdbo.c@gmail.com',
        'admfasdin',
        'asdfdsfsdf',
        'Adfsdmin Adminovic',
        '6666d66666',
        'Hesfll Lane 1',
        'Hefsll',
        'http://cenekssfvoboda.eu'
    );
        `;
    await db.run(insertString2);


    /*var x =
        await db.get(`SELECT *
                         FROM contacts WHERE shorthand LIKE ?`,
            "%%");
    console.log(x);*/

    var x =
        await db.all(`SELECT * 
                         FROM contacts`);
    console.log(x);
    res.end(`<h1>hello ${JSON.stringify(x)}</h1>`);

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