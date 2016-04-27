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
      });
    }

})();
