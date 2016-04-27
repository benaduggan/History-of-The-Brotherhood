(function () {
    'use strict';

    angular
        .module('broho.room')
        .controller('RoomListController', RoomListController);

    function RoomListController($rootScope, dataService) {
        var vm = this;
        vm.rooms = [];
        vm.floors = [];
        vm.form = {};
        vm.create = false;

        vm.activate = activate;
        vm.getRooms = getRooms;
        vm.getFloors = getFloors;
        vm.createRoom = createRoom;
        vm.updateRoom = updateRoom;
        vm.deleteRoom = deleteRoom;
        vm.floor_id_to_string = floor_id_to_string;


        vm.activate();

        ///////////////////////////////////////////////////////////////////////

        function activate() {
          $rootScope.$broadcast('setTitle', 'Room List');
          vm.getRooms();
        }

        function getRooms() {
          dataService.get('room/').then(function(promise){
            vm.rooms = promise.data;
            vm.getFloors();
        });
        }

        function getFloors() {
            dataService.get('floor/').then(function(promise){
                vm.floors = promise.data;
            });
        }

        function updateRoom(room) {
            if(room.edit){
              dataService.put('room/' + room.id + '/', room).then(function(){
                vm.activate();
              })
              room.edit = false; // on success
            } else {
              room.edit = true;
            }
        }

        function deleteRoom(room) {
            if(room.delete){
              dataService.delete('room/' + room.id + '/').then(function(){
                room.delete = false; // on success pop from list
                vm.activate();
              });
            } else {
              room.delete = true;
            }
        }

        function createRoom() {
            if(vm.create){
              dataService.post('room/', vm.form).then(function () {
                vm.create = false;
                vm.form = {};
                vm.activate();
              })
            } else {
              vm.create = true;
            }
        }

        function floor_id_to_string(id) {
            var result = vm.floors.filter(function(floor) {
                return floor.id == id;
            });
            if (result.length > 0) {
                return result[0].name;
            }
        }
    }
})();
