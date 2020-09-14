const express = require('express');
const lowdb = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/data.json');
const db = lowdb(adapter);

var app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/api/scores', (req, res) => {
    res.sendFile(__dirname + '/data/data.json');
});

app.post('/api/score', (req, res) => {
    console.log(req);
    res.sendStatus(201);

    db.get('scores')
    .push( {"nick" : req.body.nick, "score" : req.body.score} )  // Don't do this in real life... :-)
    .write();
})

app.listen(8080);