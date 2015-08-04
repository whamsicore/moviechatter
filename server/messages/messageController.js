Message = require('./messageModel');


module.exports = {
  retrieve: function(req, res){
    Message.find({}).sort('-created_at').limit(10).exec(function(err, messages){
      console.log("Server -----> inside of messageController.retrieve(). ", messages);
      res.send(JSON.stringify(messages));
    });
  },
  addNew: function(data, callback){
    var username = data.username;
    var message = data.message;

    var newMessage = new Message({username:username, text: message});
    newMessage.save(function(err, newMsg){
      console.log(newMsg.text);

      callback(newMsg);

    });

    // var result = Message.find({}.function(){
    //   console.log("Server -----> inside of messageController.retrieve(). ", result);
    //   res.end(result);
    // }); 


  }
} // module.exports