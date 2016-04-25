(function() {
  'use strict';

  angular
    .module('broho.static')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/static/home.html',
        controller: 'StaticController as vm'
      })
      .state('version', {
        url: '/version',
        templateUrl: 'app/static/version.html',
        controller: 'StaticController as vm'
      })
      .state('credits', {
        url: '/credits',
        templateUrl: 'app/static/credits.html',
        controller: 'StaticController as vm'
      });
  }

})();
