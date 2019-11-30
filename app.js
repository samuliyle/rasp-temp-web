const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const temperature = require("./api/temperature");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use('/temperature', temperature)

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;