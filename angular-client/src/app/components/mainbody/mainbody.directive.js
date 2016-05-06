(function() {
  'use strict';

  angular
    .module('broho')
    .directive('mainbody', mainbody);

    /** @ngInject */
    function mainbody() {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/mainbody/mainbody.html',
        controller: MainBodyController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

      /** @ngInject */
      function MainBodyController($scope) {
        var vm = this;

        $scope.$on('setTitle', function(event, content) {
            vm.title = content;
        });
      }
    }

})();
