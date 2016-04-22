(function() {
  'use strict';

  angular
    .module('broho.static')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/static/home.html',
      })
      .state('version', {
        url: '/version',
        templateUrl: 'app/static/version.html',
      })
      .state('credits', {
        url: '/credits',
        templateUrl: 'app/static/credits.html',
      });
  }

})();
