var messageController = require('./messages/messageController');

module.exports = function(io){
  io.on('connection', function(socket) {
    console.log('client connected: ', socket.id);

    // send socket default chatrooms
    // io.to(socket.id).emit('init', defaults);
    
    // io.to(socket.id).emit('init', ['lobby', 'other']);
    
    // join main chatroom
    // socket.join('lobby');

    socket.on('cs-newmsg', function(data) {
      console.log('SocketIO ------> data = ', data);
      messageController.addNew(data, function(newMsg){
        socket.emit('sc-newmsg', newMsg);

      });
      // messages.push(data);
      // io.to('lobby').emit('broadcast chat', data);
    });

    // when client request a channel change
    /*socket.on('channel change', function(channel) {
      console.log(socket.id, ' wants to join channel: ', channel);
      // if socket had a channel before, leave the channel
      if (socket.lastChannel) {
        socket.leave(socket.lastChannel);
        socket.lastChannel = null;
      } //if
      socket.join(channel);
      socket.lastChannel = channel;
      // send last messages of current channel to socket
      var channelMessages = _.filter(messages, function(item) {
        if (item['chatroom'] === channel) {
          return item;
        }
      })
      io.to(socket.id).emit('channel rebuild', channelMessages);
    }); //socket.on

    socket.on('channel added', function(data) {
      socket.emit('new channel', data);
    }); //socket.on*/

    socket.on('disconnect', function() {
      console.log('client disconnected');
    }); //socket.on

  }); //io.on

}