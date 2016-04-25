(function () {
    'use strict';

    angular
        .module('broho.static')
        .controller('StaticController', StaticController);

    function StaticController($rootScope,  $state) {
        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          var url = $state.current.url
          var title = url.charAt(1).toUpperCase() + url.slice(2)
          $rootScope.$broadcast('setTitle', title);
        }


    }
})();
