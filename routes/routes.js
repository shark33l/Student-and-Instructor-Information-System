const express = require('express');

const app = express();

//Require Routes
const index = require('./index');
const users = require('./users')

//Routes
app.use('/', index);
app.use('/users', users);

module.exports = app;