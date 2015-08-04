
var express     = require('express');
var mongoose    = require('mongoose');
var routes    = require('./routes');

var app = express();

var server = require("http").Server(app);
var io = require('socket.io')(server);
server.listen(5999);

require('./serverIO')(io);

mongoose.connect('mongodb://localhost/moviechatter'); // connect to mongo database named shortly

routes(app); //apply routes via express

/********* LEGACY **************/
// configure our server with all the middleware and and routing
// require('./config/middleware.js')(app, express);
// export our app for testing and flexibility, required by index.js

// app.listen(5999);

// module.exports = app;