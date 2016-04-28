(function() {
  'use strict';

  angular
    .module('broho')
    .directive('auth', auth);

    /** @ngInject */
    function auth() {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/auth/auth.html',
        controller: AuthController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

      /** @ngInject */
      function AuthController($rootScope, $scope, $state, $window, sessionService) {
            var vm = this;
            vm.logged_in = false;
            vm.user = {};

            vm.logout = logout;
            vm.getUserInfo = getUserInfo;

            activate();

            function activate() {
                $scope.$on('authenticated', function(event, content) {
                    vm.logged_in = content;
                    vm.getUserInfo();
                });
            }

            function logout() {
                sessionService.logout().then(function(){
                    $state.transitionTo('login');
                });
            }

            function getUserInfo() {
                if ($window.localStorage.brohoUser){
                    vm.user = JSON.parse($window.localStorage.brohoUser)
                }
            }
        }
    }

})();
