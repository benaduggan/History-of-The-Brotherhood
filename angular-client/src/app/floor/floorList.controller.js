(function () {
    'use strict';

    angular
        .module('broho.floor')
        .controller('FloorListController', FloorListController);

    function FloorListController(dataService) {
        var vm = this;
        vm.floors = [];
        vm.editing = false;
        vm.delete = false;
        vm.create = false;

        vm.getFloors = getFloors;
        vm.createFloor = createFloor;
        vm.updateFloor = updateFloor;
        vm.deleteFloor = deleteFloor;


        activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          vm.getFloors();
        }

        function getFloors() {
          dataService.get('floor/').then(function(promise){
            vm.floors = promise.data;
            console.log(vm.floors)
          })
        }

        function updateFloor(floor) {
            if(floor.editing){
              dataService.put('floor/' + floor.id + '/', floor).then(function(promise){
                console.log(promise);
              })
              console.log("save floor " + JSON.stringify(floor))
              floor.editing = false; // on success
            } else {
              floor.editing = true;
            }
        }

        function deleteFloor(floor) {
            if(floor.delete){
              dataService.delete('floor/' + floor.id + '/').then(function(promise){
                console.log("Delete floor success");
              },
              function(error){
                console.log(error);
              });
              floor.delete = false; // on success pop from list
            } else {
              floor.delete = true;
            }
        }

        function createFloor() {
            if(vm.create){
              console.log("Create floor")
              vm.create = false; // on success pop from list
            } else {
              vm.create = true;
            }
        }

    }
})();
