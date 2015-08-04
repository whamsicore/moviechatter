angular.module('movieChatter', [])
.config(function() {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/chat/chat.html',
  //     controller: 'LinksController'
  //   });


})
.controller('playerController', function($scope, $http, roomHelper, $timeout, $window){
    
  $scope.roomname = roomHelper.getRoomname() || "Lobby"; // get roomname from storage

  $scope.roomname = "Lobby"; // get roomname from storage

  var socket = io.connect("http://127.0.0.1:5999/");

   $http({
      method: 'GET',
      url: '/room'
    })
    .then(function (resp) {
      console.log("TEST ----> inside of chatController.getMessage. resp=", resp);
      var roomData = resp.data;
      $scope.roomData = roomData;

      var startTime = new Date(roomData.created_at).getTime(); 
      var curTime = new Date().getTime();
      var timeDiff = (curTime - startTime)/1000;
      var movieId = roomData.movieId; 

      $timeout(function(){
        // console.log('Inisde setTimeout');

        $window.videoPlayer.playVideo().seekTo(timeDiff);

      }, 1000);
      // $window.alert('whatsup!');
      // $window.playVideo();
      // console.log("TEST ----> inside of chatController.getMessage. timeDiff=", (curTime - startTime)/1000);
      // $timeout(window.playVideo, 1000);
      // window.playVideo();
      // $scope.messages = $filter('orderBy')($scope.messages, 'created_at',true);
    }); //$http set messages

  // window.timeDiff = 300; 

  //func: Get current room information
  //func: set messages array




    /******** SET YOUTUBE VARS ***********/

    /******** SET YOUTUBE VARS ***********/
}) //playerController()
.controller('chatController', function($scope, $http, $filter, userHelper){
  
  $scope.username = userHelper.getUsername(); // Store username 


  var socket = io.connect("http://127.0.0.1:5999/");
  //func: 

  socket.on('sc-newmsg', function(data){
    console.log("SocketIO is a success! data = ", data);
    console.log("SocketIO is a success! scope.msg = ", $scope.messages);

    $scope.$apply(function() { //for realtime updating
      $scope.messages.push(data);
      $scope.messages = $filter('orderBy')($scope.messages, 'created_at',true);

    }); //scope.apply
  }); //SCnewMsg

  $scope.submitMessage = function(){
    var username = $scope.username;
    var message = $scope.message;

    userHelper.setUsername(username);// store username
    $scope.message = ''; //reset message

    socket.emit('cs-newmsg', {username:username, message:message}); 

  };

  
  //func: set messages array
  $http({
      method: 'GET',
      // url: '../../server/links/linkRoutes',
      url: '/message'
    })
    .then(function (resp) {
      // console.log("TEST ----> inside of chatController.getMessage. resp=", resp);
      $scope.messages = resp.data;
      $scope.messages = $filter('orderBy')($scope.messages, 'created_at',true);
    }); //$http set messages

}). //chatController()
factory('userHelper', function(){  
  var setUsername = function(username){
    if(typeof(Storage) !== "undefined") { //if there is browser support
      localStorage.movieChatterUsername = username; 
    } 
  }; //setUsername()

  var getUsername = function(){
    return localStorage.movieChatterUsername || ''; 
  }; //getUsername()

  return {setUsername:setUsername, getUsername:getUsername};

}) //factory.userHelper()
.factory('roomHelper', function($http, $q){  
  var setRoomname = function(roomname){
    if(typeof(Storage) !== "undefined") { //if there is browser support
      localStorage.movieChatterRoomname = roomname; 
    } 
  }; //setRoomname()

  var getRoomname = function(){
    return localStorage.movieChatterRoomname || ''; 
  }; //getRoomname()

  var getRoom = function(){
    return localStorage.movieChatterRoomname || ''; 
  }; //getRoomname()

  return {setRoomname:setRoomname, getRoomname:getRoomname};

}) //factory.roomHelper()
.run(function ($rootScope, $location) {
    // $http({
    //   method: 'GET',
    //   url: '/room'
    // })
    // .then(function (resp) {
    //   // console.log("TEST ----> inside of chatController.getMessage. resp=", resp);
    //   var roomData = resp.data;
    //   $scope.roomData = roomData;

    //   var startTime = new Date(roomData.created_at).getTime(); 
    //   var curTime = new Date().getTime();

    //   window.movieId = roomData.movieId; 
    //   window.timeDiff = (curTime - startTime)/1000;
      
    //   // $scope.messages = $filter('orderBy')($scope.messages, 'created_at',true);
    // }); //$http set messages
      // window.timeDiff = 1000;

  // $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    
  // }); //$rootScope
});