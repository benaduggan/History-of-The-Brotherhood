(function () {
	'use strict';

	angular
	.module('broho.map')
	.controller('MapController', MapController);

	function MapController($rootScope, dataService) {
		var vm = this;
		vm.map_data = [];
		vm.form = {};

		vm.selected_semester = 'Spring-2016';

		vm.create = false;
		vm.delete = false;

		vm.activate = activate;
		vm.getMap = getMap;
		vm.createMapItem = createMapItem;
		vm.getPeople = getPeople;
		vm.getRooms = getRooms;
		vm.deleteMapItem = deleteMapItem;

		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			vm.getMap();
			$rootScope.$broadcast('setTitle', 'The Map');
		}

		function getMap() {
			var tmp = vm.selected_semester.split('-')
			dataService.get('map/' + tmp[0] + '/' + tmp[1] + '/').then(function(promise){
				vm.map_data = promise.data;
			})
		}

		function createMapItem() {
			if (vm.create) {
				dataService.post('person_room/', vm.form).then(function(){
					vm.activate();
				})
				vm.create = false;
			} else {
				vm.create = true;
			}
		}

		function deleteMapItem(item) {
			if (item.delete){
				dataService.delete('person_room/' + item.id + '/').then(function() {
					vm.activate();
				})
			}
			else{
				item.delete = true;
			}
		}


		function getPeople() {
			dataService.get('person/').then(function(promise) {
				vm.people = promise.data;
			});
		}

		function getRooms() {
			dataService.get('room/').then(function(promise) {
				vm.rooms = promise.data;
			});
		}

	}
})();
