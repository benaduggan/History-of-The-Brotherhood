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
        controllerAs: 'authCtrl',
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
            vm.checkToken = checkToken;

            activate(false);

            $scope.$on('authenticated', function(event, content) {
                activate(content);
            });

            function activate(logged_in) {
                vm.logged_in = logged_in;
                vm.getUserInfo();
                vm.checkToken();
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

            function checkToken(){
                if ($window.localStorage.brohoToken){
                    vm.logged_in = true;
                }
            }
        }
    }

})();
