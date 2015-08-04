Message = require('./messageModel');


module.exports = {
  retrieve: function(req, res){
    Message.find({}).sort('-created_at').limit(10).exec(function(err, messages){
      console.log("Server -----> inside of messageController.retrieve(). ", messages);
      res.send(JSON.stringify(messages));
    });
  },
  addNew: function(req, res){
    var username = req.body.username;
    var message = req.body.message;
    // console.log("Server -----> inside of messageController.addNew(). username=", username);
    console.log("Server -----> inside of messageController.addNew(). message=", message);

    var newMessage = new Message({username:username, text: message});
    newMessage.save(function(err, newMsg){
      console.log(newMsg.text);

    });
    // var result = Message.find({}.function(){
    //   console.log("Server -----> inside of messageController.retrieve(). ", result);
    //   res.end(result);
    // }); 


  }
} // module.exports