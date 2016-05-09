(function() {
  'use strict';

  angular
    .module('broho')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'navCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $rootScope, sessionService) {
        var vm = this;
        vm.sessionUser = {};

        activate();

        function activate() {
            $rootScope.$on('$stateChangeStart', function(){
                vm.sessionUser = sessionService.getUser();
            })
        }
    }
  }

})();
