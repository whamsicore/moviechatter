var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
 roomname: String,
 currentMovie: String,
 movieId: String, //youtube
 startTime: {type: Date}, //same as updated at?
 created_at: {type: Date},
 updated_at: {type: Date}
});

roomSchema.pre('save', function(next){
  if(!this.created_at){
    this.created_at = new Date();
    this.updated_at = new Date();
  }else{
    this.updated_at = new Date();
  };

  next();
});

// func: create default room, with default movie, if none exist
var Room = mongoose.model('room', roomSchema);
// console.log('Inside Room.js ------>Room = ', );

//initiate with default room
Room.find(function(err, rooms){
  if(rooms.length===0){
    // console.log("roomModel -------> Uninitiated right now");
    new Room({roomname:'Lobby', movieId: 'nS68JH9lFEs'}).save();
  } //if


});
// Room.find

module.exports = mongoose.model('room', roomSchema);
