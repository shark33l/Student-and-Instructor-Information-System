const express = require('express');
const routes = express.Router();


//Require Routes
const index = require('./index');
const users = require('./users');
const notice = require('./noticeRouter');

//Routes
routes.use('/', index);
routes.use('/users', users);
routes.use('/notice',notice);

module.exports = routes;