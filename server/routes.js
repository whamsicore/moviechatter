var morgan      = require('morgan'); // used for logging incoming request
var bodyParser  = require('body-parser');
    // helpers     = require('./helpers.js'); // our custom middleware
var express = require('express');
var messageController = require('./messages/messageController');
// var messageController = require('./messages/messageController');

module.exports = function(app){

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../client'));

  /******* TESTING *******/
  // app.route('/test')
  //   .get(function(req, res){
  //     console.log('TEST ------> inside of root.get()');
  //     res.end('hello world!'); 
  //   });
  /******* TESTING *******/ 

  app.route('/message')
    .get(function(req, res){ //retrieve last 10 messages

      // console.log('TEST ------> inside of message.get()');
      // res.end('hello world!'); 
      messageController.retrieve(req, res);
    })
    .post(function(req, res){ //add new message to database
      // console.log('TEST ------> inside of message.post()');
      
      messageController.addNew(req, res)
      // res.end('hello world!'); 
    });
};