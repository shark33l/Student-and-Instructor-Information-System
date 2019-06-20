const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/config').mongoDbURL;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error : ' + err));

//Cors
app.use(cors());

//Bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//Require Routes
const routes = require('./routes/routes');

//Routes
app.use('/rest/api', routes);

const PORT = process.env.PORT | 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));