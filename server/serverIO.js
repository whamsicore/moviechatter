var messageController = require('./messages/messageController');
var roomController = require('./rooms/roomController');

module.exports = function(io){

  var usernames = {};

  io.on('connection', function(socket) {
    console.log('client connected: ', socket.id);

    // send socket default chatrooms
    // io.to(socket.id).emit('init', defaults);
    
    // io.to(socket.id).emit('init', ['lobby', 'other']);
    
    // join main chatroom

    socket.on('cs-signin', function(data){
      var username = data.username;
      socket.username = username; 
      
      socket.emit('signinComplete', {});

    });
    
    
    socket.on('cs-newmsg', function(data) {
      console.log('SocketIO ------> data = ', data);
      var username = data.username;
      var message = data.message;

      socket.join('lobby'); //join the current room
      
      usernames[username] = username; 

      messageController.addNew(data, function(newMsg){
        io.sockets.emit('sc-newmsg', newMsg);
      });

      // messages.push(data);
      // io.to('lobby').emit('broadcast chat', data);
    });

    socket.on('cs-init', function(){
      socket.emit('sc-init', {timeDiff: 600});

    });

    socket.on('disconnect', function() {
      delete usernames[socket.username];
      console.log('client disconnected');
    }); //socket.on

  }); //io.on

}