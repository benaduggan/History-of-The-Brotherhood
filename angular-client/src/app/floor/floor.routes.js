(function() {
  'use strict';

  angular
    .module('broho.floor')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('floorList', {
        url: '/floor/',
        templateUrl: 'app/floor/floorList.html',
        controller: 'FloorListController',
      })
      .state('floorDetail', {
        url: '/floor/:id/',
        templateUrl: 'app/floor/floorDetail.html',
        controller: 'FloorDetailController',
      });
    };

})();
