angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "tabs.html"
  })


    .state('tabs.master', {
    url: "/master",
    views: {
      'main': {
        controller:'MasterCtrl',
        templateUrl: "master.html"
      }
    }
  })

    .state('tabs.detail', {
    url: "/detail/",
    views: {
      'main': {
        controller:'DetailCtrl',
        templateUrl: "detail.html"
      }
    }
  });
  $urlRouterProvider.otherwise("tabs/master");
})

.controller('MasterCtrl', function($scope, $http, $ionicModal,$timeout) {
/*
  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });*/  
  //Popup to create post
$ionicModal.fromTemplateUrl('templates/mylongform.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  $scope.openModal = function(){
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }
  $scope.createPost = function(h){
    var blank = "";
    if (h.newTitle != blank || h.newDescription != blank){
    $http.post('http://j0nomar.com/chansu/ajax/createPost.php?title='+h.newTitle+'&description='+h.newDescription+'&startVotes=0');
    $scope.modal.hide();

  }

  }

  
  //Refreshing system
  $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $timeout( function() {
      //simulate async response
    $state.reload()
  }); 

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');  
      }, 1000);  
  }


  //Voting System
  $http.post('http://j0nomar.com/chansu/ajax/cleanUp.php').success(function(){
    
  });
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

  };

})