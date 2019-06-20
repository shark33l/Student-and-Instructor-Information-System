const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Require Routes
const routes = require('./routes/routes');
app.use(bodyParser.json());

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})

//Routesnpm install @material-ui/icons
app.use('/', routes);

const PORT = process.env.PORT | 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));