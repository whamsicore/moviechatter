Room = require('./roomModel');

module.exports = {
  
  retrieve: function(req, res){
    Room.find({}).sort('-created_at').limit(10).exec(function(err, rooms){
      // console.log("Server -----> inside of messageController.retrieve(). ", rooms);
      res.send(JSON.stringify(rooms));
    });
  }, //retrieve()
  getLobby: function(req, res){
    Room.find({roomname:'Lobby'}).exec(function(err, rooms){
      // console.log("Server -----> inside of messageController.retrieve(). ", rooms);
      res.send(JSON.stringify(rooms[0]));
    });
  }, //retrieve()
  addNew: function(data, callback){
    var roomname = data.roomname;
    // var message = data.message;

    var newMessage = new Room({roomname:roomname});
    newMessage.save(function(err, newMsg){
      console.log(newMsg.text);

      callback(newMsg);

    });

    // var result = Message.find({}.function(){
    //   console.log("Server -----> inside of messageController.retrieve(). ", result);
    //   res.end(result);
    // }); 


  }, //retrieve()
  restartVideo: function(){
    console.log("TEST ------> inside restartVideo");
    Room.find({roomname:'Lobby'}, function(err, rooms){
      var lobby = rooms[0];
      lobby.save();

    });
    
  } //restartVideo()
} // module.exports