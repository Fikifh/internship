const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const {logs} = require('./variables');
const strategies = require('./passport');
const error = require('../middleware/error');

const app = express();

// request logging. dev: console | production
app.use(morgan(logs));

//parse body params adn attache them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//gzip compression
app.use(compress());

//use HTTP verbs such as PUT or DELETE
//in places where the client doesn't support it
app.use(methodOverride());

//secure app by setting variouse HTTP headers
app.use(helmet());

//enable CORS - Cross Original Resource Sharing
app.use(cors());

//enable authentication
app.use(passport.initialize());
passport.use('jwt',strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

//api v1 routes
app.use('/api', routes);

//if error is an instance of APIError, convert it
app.use(error.converter);

//catch 404 and forward to error.r handler
app.use(error.notFound);

//error handler, send stacktrace only during developement
app.use(error.handler);

module.exports = app;