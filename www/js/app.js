// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    
    }
  });
})
.controller('votingCtrl', function($scope, $http) {
  $http.post('http://j0nomar.com/chansu/ajax/getPosts.php').success(function(data){
    $scope.posts = data;
  });
  $scope.upVote = function(post){
    post.votes++;
    updateVote(post.id,post.votes);
  };
  $scope.downVote = function(post){
    post.votes--;
    updateVote(post.id,post.votes);
  };
  function updateVote(id,votes){
    $http.post('http://j0nomar.com/chansu/ajax/updateVote.php?id='+id+'&votes='+votes);
  }
});