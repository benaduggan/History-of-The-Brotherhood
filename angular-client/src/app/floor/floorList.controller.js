(function () {
    'use strict';

    angular
        .module('broho.floor')
        .controller('FloorListController', FloorListController);

    function FloorListController(dataService) {
        var vm = this;
        vm.floors = [];

        vm.getFloors = getFloors;


        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          vm.getFloors();
        }

        function getFloors(){
          dataService.get('floor/').then(function(promise){
            vm.floors = promise.data;
            console.log(vm.floors)
          })
        }

    }
})();
