(function() {
  'use strict';

  angular
    .module('broho')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    $urlRouterProvider.otherwise('/home');
  }

})();
