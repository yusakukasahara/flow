var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var util = require('./lib/utility');

//declare mongoose connection
var db = mongoose.connection;

//console log successful connection to database
db.once('open', () => console.log('mongo database loaded'));

//importing routes
var routes = require('./routes/Routes.js');

//importing models
//var model = require('./models/model');

//declare uri and import mongodb key
var DB_CREDENTIALS = require('./keys/mongoDB.js');
var uri = `mongodb://${DB_CREDENTIALS}`;
var local =  'mongodb://localhost';

//set mongoose.Promise to promise constructor
mongoose.Promise = global.Promise

//set to 'local' to run on localhost
mongoose.connect(uri); // mongoose.connect(local);

/*
middleware - middleware functions can perform the following tasks:
  Execute any code.
  Make changes to the request and the response objects.
  End the request - response cycle.
  Call the next middleware function in the stack.
*/
var app = express();

//logs HTTP request to console
app.use(util.logger);

//Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

// Returns middleware that only parses json and only looks at requests where the Content - Type header matches the type option.This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings. A new body object containing the parsed data is populated on the request object after the middleware(i.e.req.body). https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content - Type header matches the type option.This parser accepts only UTF - 8 encoding of the body and supports automatic inflation of gzip and deflate encodings. A new body object containing the parsed data is populated on the request object after the middleware(i.e.req.body).This object will contain key - value pairs, where the value can be a string or array(when extended is false), or any type(when extended is true). https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({extended: true}));

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware. https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

//middleware for sessions
app.use(session({
  secret: '$ctrl.props.$scope.alice.sayhi.bob.bind(this, window)',
  resave: false,
  saveUninitialized: true
}));

//serve up static files
app.use(express.static('../client/public'));

//register the route
routes(app);

//serve index.html
app.get('*', (req, res) => {
  res.sendFile('../client/public/index.html')
});

//set and listen to env port or 3000
var port = process.env.PORT || 3000;
app.listen(port);

console.log('flow listening on: ' + port);