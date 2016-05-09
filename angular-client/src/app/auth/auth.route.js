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
        controller: 'UserController as vm'
      })
    //   .state('adminList', {
    //     url: '/admin/',
    //     templateUrl: 'app/auth/admin/adminList.html',
    //     controller: 'UserController as vm'
    //   })
      ;
    }

})();
