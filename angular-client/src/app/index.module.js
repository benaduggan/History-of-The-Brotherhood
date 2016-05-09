(function() {
  'use strict';

  angular
    .module('broho', [
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ngMaterial',
      'toastr',
      'broho.static',
      'broho.position',
      'broho.person',
      'broho.room',
      'broho.map',
      'broho.floor',
      'broho.auth'
    ])
    .run(AuthenticationRequired);


    function AuthenticationRequired($window, $rootScope, $state, sessionService) {
        $rootScope.$on("$stateChangeStart", function(event, toState){
            if(toState.authenticate && !(toState.name === 'login') ) {
                if($window.localStorage.getItem('brohoUser') === null ) {
                    console.log("not logged in - redirecting to login page")
                    $state.transitionTo("login");
                    event.preventDefault();
                    return;
                }

                var user = sessionService.getUser();
                if (!user.verified_floor_member) {
                    console.log("This route requires you to be verified - redirecting to login page");
                    $state.transitionTo("login");
                    event.preventDefault();
                    return;
                }
            }
        });
    }
})();
