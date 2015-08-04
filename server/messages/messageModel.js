var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
 text: String,
 username: String,
 user_id: Number, 
 created_at: {type: Date}

});

messageSchema.pre('save', function(next){
  if(!this.created_at){
    this.created_at = new Date();
  };

  next();
});

module.exports = mongoose.model('message', messageSchema);
