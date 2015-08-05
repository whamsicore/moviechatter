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

      $window.startTime = new Date(roomData.updated_at).getTime(); 
      $window.movieId = roomData.movieId; 
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
.controller('chatController', function($scope, $http, $filter, $timeout, userHelper, roomHelper){
  
  $scope.username = userHelper.getUsername(); // Store username 
  if($scope.username!==''){ //func: play video if username has been set
    $scope.showSignin = false; // Store username 
    $timeout(function(){
      roomHelper.playVideo();
    }, 1200);
  }else{
    $scope.showSignin = false; // Store username 
  } //if

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

    if(message === ''){
      alert("Message please?");
    }else{
      userHelper.setUsername(username);// store username
      $scope.message = ''; //reset message

      socket.emit('cs-newmsg', {username:username, message:message});       
    } //if
  }; //submitMessage()

  $scope.submitUsername = function(){
    var username = $scope.username;
    // var message = $scope.message;

    if(username === ''){
      alert("Name?");
    }else{
      userHelper.setUsername(username);// store username
      // $scope.message = ''; //reset message
      socket.emit('signin', {username:username});       
      $scope.showSignin = false;
    } //if
  }; //submitMessage()

  socket.on('signinComplete', function(data){
    roomHelper.playVideo();    
  });

  
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
.factory('roomHelper', function($http, $q, $window){  
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

  var restartVideo = function(){
    $http({
      method: 'POST',
      // url: '../../server/links/linkRoutes',
      url: '/room', 
      data: {}
    })
    .then(function (resp) {

    }); //$http set messages
  }; //restartVideo()

  var playVideo = function(){
    $window.videoPlayer.loadVideoById($window.movieId).pauseVideo();
    var curTime = new Date().getTime(); 
    var timeDiff = (curTime - $window.startTime)/1000;
    // console.log('Inisde setTimeout');
    var movieLength = $window.videoPlayer.getDuration();
    if(timeDiff>movieLength){ //movie is over, start playing from beginning
      $window.videoPlayer.playVideo();
      roomHelper.restartVideo();
    }else{
      $window.videoPlayer.playVideo().seekTo(timeDiff);
    }
  }; //playVideo()

  return {
    setRoomname:setRoomname, 
    getRoomname:getRoomname, 
    playVideo:playVideo, 
    restartVideo:restartVideo
  }; //return

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