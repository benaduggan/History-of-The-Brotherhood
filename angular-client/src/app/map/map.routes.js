(function() {
  'use strict';

  angular
    .module('broho.map')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map/',
        templateUrl: 'app/map/map.html',
        controller: 'MapController as vm',
        authenticate: true
      });
    }

})();
