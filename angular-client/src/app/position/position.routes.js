(function() {
  'use strict';

  angular
    .module('broho.position')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('positionList', {
        url: '/position/',
        templateUrl: 'app/position/positionList.html',
        controller: 'PositionListController as vm'
      });
    }

})();
