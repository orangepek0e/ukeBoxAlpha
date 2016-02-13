angular.module('starter')

  //LoginCtrl: Handle user login

  .controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      name: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
        $state.go('inside');
      }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });
      });
    };
  })
  //RegisterCtrl: Handle registration of new users

  .controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      name: '',
      password: ''
    };

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
        $state.go('outside.login');
        var alertPopup = $ionicPopup.alert({
          title: 'Register success!',
          template: msg
        });
      }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: errMsg
        });
      });
    };
  })
  //InsideCtrl: Handle operations after user is authenticated

  .controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.destroySession = function() {
      AuthService.logout();
    };

    $scope.getInfo = function() {
      $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
        $scope.memberinfo = result.data.msg;
      });
    };

    $scope.logout = function() {
      AuthService.logout();
      $state.go('outside.login');
    };
  })
  //AppCtrl: Catch broadcasted events to go back once session is invalid

  .controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      AuthService.logout();
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });
  });
