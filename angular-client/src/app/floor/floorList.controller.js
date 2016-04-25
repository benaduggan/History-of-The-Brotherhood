(function () {
    'use strict';

    angular
        .module('broho.floor')
        .controller('FloorListController', FloorListController);

    function FloorListController(dataService) {
        var vm = this;
        vm.floors = [];
        vm.form = {};
        vm.delete = false;
        vm.create = false;

        vm.activate = activate;
        vm.getFloors = getFloors;
        vm.createFloor = createFloor;
        vm.updateFloor = updateFloor;
        vm.deleteFloor = deleteFloor;


        vm.activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          vm.getFloors();
        }

        function getFloors() {
          dataService.get('floor/').then(function(promise){
            vm.floors = promise.data;
          })
        }

        function updateFloor(floor) {
            if(floor.edit){
              dataService.put('floor/' + floor.id + '/', floor).then(function(promise){
                vm.activate();
              })
              floor.edit = false; // on success
            } else {
              floor.edit = true;
            }
        }

        function deleteFloor(floor) {
            if(floor.delete){
              dataService.delete('floor/' + floor.id + '/').then(function(promise){
                floor.delete = false; // on success pop from list
                vm.activate();
              });
            } else {
              floor.delete = true;
            }
        }

        function createFloor() {
            console.log(vm.create);
            if(vm.create){
              dataService.post('floor/', vm.form).then(function (response) {
                vm.create = false;
                vm.form = {};
                vm.activate();
              })
            } else {
              vm.create = true;
            }
        }

    }
})();
