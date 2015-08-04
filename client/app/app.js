angular.module('movieChatter', [])
.config(function() {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/chat/chat.html',
  //     controller: 'LinksController'
  //   });


})
.controller('playerController', function($scope){
    window.timeDelay = 5; 
    // alert('hellow world');
  // 
    // var player;
    // function onYouTubePlayerAPIReady() {
    //     player = new YT.Player('player', {
    //       height: '500',
    //       width: '640',
    //       playerVars: { 'controls': 1, 'start': 10 },
    //       videoId: '0Bmhjf0rKe8',
    //       time: '10s',
    //       events: {
    //         'onReady': onPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //       }
    //     }); //player
    // } //onYoutubePlayerAPIReady()

    // // autoplay video
    // function onPlayerReady(event) {
    //     event.target.playVideo();
    // } // onPlayerReady()

    // // when video ends
    // function onPlayerStateChange(event) {        
    // //     if(event.data === 0) {            
    // //         alert('done');
    // //     }
    // } // onPlayerStateChange()

  $(function(){
  }); // on document ready

}) //playerController()

.controller('chatController', function($scope, $http, $filter, userHelper){
  /****** Store username ******/
  $scope.username = userHelper.getUsername();

  /****** Store username ******/

  var socket = io.connect("http://127.0.0.1:5999/");
  
  $scope.submitMessage = function(){
    var username = $scope.username;
    var message = $scope.message;

    userHelper.setUsername(username);// store username
    $scope.message = ''; //reset message

    socket.emit('cs-newmsg', {username:username, message:message}); 

  };

  //func: 
  socket.on('sc-newmsg', function(data){
    console.log("SocketIO is a success! data = ", data);
    console.log("SocketIO is a success! scope.msg = ", $scope.messages);

    $scope.$apply(function() { //for realtime updating
      $scope.messages.push(data);
      $scope.messages = $filter('orderBy')($scope.messages, 'created_at',true);

    }); //scope.apply
  }); //SCnewMsg
  
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

}).factory('userHelper', function(){  
  var setUsername = function(username){
    if(typeof(Storage) !== "undefined") { //if there is browser support
      localStorage.movieChatterUsername = username; 
    } 
  }; //setUsername()

  var getUsername = function(){
    return localStorage.movieChatterUsername || ''; 
  }; //getUsername()

  return {setUsername:setUsername, getUsername:getUsername};

}) //chatController()
.run(function ($rootScope, $location) {

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    
  }); //$rootScope
});