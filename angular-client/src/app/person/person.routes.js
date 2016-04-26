(function() {
  'use strict';

  angular
    .module('broho.person')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('personList', {
        url: '/person/',
        templateUrl: 'app/person/personList.html',
        controller: 'PersonListController as vm'
      });
    }

})();
