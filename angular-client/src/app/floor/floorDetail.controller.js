(function () {
    'use strict';

    angular
        .module('broho.floor')
        .controller('FloorDetailController', FloorDetailController);

    function FloorDetailController($stateParams) {
        var vm = this;
        vm.floor_id = 0;

        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          vm.floor_id = $stateParams.id
        }

    }
})();
