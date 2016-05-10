(function() {
  'use strict';

  angular
    .module('broho.picture')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('pictureList', {
        url: '/picture/',
        templateUrl: 'app/picture/pictureList.html',
        controller: 'PictureListController as vm',
        authenticate: true
      });
    }

})();