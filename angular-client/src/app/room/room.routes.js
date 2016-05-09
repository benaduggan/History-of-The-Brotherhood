(function() {
  'use strict';

  angular
    .module('broho.room')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('roomList', {
        url: '/room/',
        templateUrl: 'app/room/roomList.html',
        controller: 'RoomListController as vm',
        authenticate: true
      });
    }

})();
