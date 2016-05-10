(function() {
  'use strict';

  angular
    .module('broho')
    .directive('room', room);

    /** @ngInject */
    function room() {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/room/room.html',
        controller: RoomController,
        controllerAs: 'roomCtrl',
        bindToController: true,
        require: "?ngModel",
        scope: {
            consumerModel: '=ngModel'
        }
      };

      return directive;

      /** @ngInject */
      function RoomController($rootScope, $scope, $state, $window, sessionService) {
            var vm = this;

            activate();

            function activate() {
                console.log(vm.consumerModel)
            }
        }
    }

})();
