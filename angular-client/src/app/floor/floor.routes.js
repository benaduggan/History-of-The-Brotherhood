(function() {
  'use strict';

  angular
    .module('broho.floor')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('floorList', {
        url: '/floor/',
        templateUrl: 'app/floor/floorList.html',
        controller: 'FloorListController as vm',
        authenticate: true
      });
    }

})();
