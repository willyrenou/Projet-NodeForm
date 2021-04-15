const express = require('express');
const router = require('./routes/index');

const path = require('path');
const app = express();

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*
using 'body-parser' 'urlencoded' method allows us to 
handle data sent as application/x-www-form-urlencoded
There are various ways to format the data you POST to the server
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

module.exports = app;