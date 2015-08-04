angular.module('movieChatter', [])
.config(function() {
  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'app/chat/chat.html',
  //     controller: 'LinksController'
  //   });


})
.controller('playerController', function(){


})
.controller('chatController', function($scope, $http){
  

  $http({
      method: 'GET',
      // url: '../../server/links/linkRoutes',
      url: '/message'
    })
    .then(function (resp) {
      console.log("TEST ----> inside of chatController.getMessage. resp=", resp);
      $scope.messages = resp.data;
    });

  $scope.submitMessage = function(Helpers){
    var username = $scope.username;
    var message = $scope.message;
    $scope.message = ''; //reset message
    console.log('submitting message. username='+username);

    $http({
      method: 'POST',
      // url: '../../server/links/linkRoutes',
      url: '/message', 
      data: {username:username, message:message}
    })
    .then(function (resp) {
      return resp;
    });
  } //submitMessage

})
.factory('Helpers', function ($window) {



})
.run(function ($rootScope, $location) {

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    
  }); //$rootScope
});