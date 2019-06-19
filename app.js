const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Require Routes
const routes = require('./routes/routes');

//Routesnpm install @material-ui/icons
app.use('/', routes);

const PORT = process.env.PORT | 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));