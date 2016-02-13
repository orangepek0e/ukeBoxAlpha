angular.module('starter')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'http://127.0.0.1:8080/api'
    //  For not simulator use: url: 'http://127.0.0.1:8100/api'
  });
