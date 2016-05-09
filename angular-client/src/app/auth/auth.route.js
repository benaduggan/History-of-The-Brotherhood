(function() {
  'use strict';

  angular
    .module('broho.auth')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login/',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController as vm'
      })
      .state('userList', {
        url: '/user/',
        templateUrl: 'app/auth/user/userList.html',
        controller: 'UserListController as vm'
      })
      .state('user', {
        url: '/user/:id',
        templateUrl: 'app/auth/user/user.html',
        controller: 'UserController as vm'
      })
      .state('registrationSuccess', {
        url: '/register/success',
        template: '<h1>Success! Now you have to wait for verification, but the admins have been notified and should verify you soon!</h1>'
      })
      ;
    }

})();
