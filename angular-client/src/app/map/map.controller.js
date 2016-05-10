(function () {
	'use strict';

	angular
	.module('broho.map')
	.controller('MapController', MapController);

	function MapController($rootScope, dataService) {
		var vm = this;
		vm.map_data = [];
		vm.form = {};
		vm.roomTest = {
			'room_num': 303,
			"occupants":
			[
				{'first_name': "Ben", 'last_name': "Duggan", "nickname": 'Ryan', 'class': 'Senior', "url": 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'},
				{'first_name': "Ben", 'last_name': "Duggan", "nickname": 'Ryan', 'class': 'Senior', "url": 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}
			]
		}

		vm.selected_semester = 'Spring-2016';

		vm.create = false;
		vm.delete = false;

		vm.activate = activate;
		vm.getMap = getMap;
		vm.createMapItem = createMapItem;
		vm.getPeople = getPeople;
		vm.getRooms = getRooms;
		vm.deleteMapItem = deleteMapItem;
    	vm.getMapStats = getMapStats;
    	vm.calculate_class = calculate_class;

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

    	function getMapStats() {
			var tmp = vm.selected_semester.split('-')
			dataService.get('map/' + tmp[0] + '/' + tmp[1] + '/stats').then(function(promise){
				vm.map_stats_data = promise.data;
			})
		}



    	function calculate_class(pr) {
			var semester = vm.selected_semester.split('-')[0]
			if (semester == 'Fall') {
				var offset = 0.5;
			} else {
				var offset = -0.5;
			}

			var num = vm.selected_semester.split('-')[1] - pr.start_semester.split('-')[1] + offset;

			var school_class = '';
			switch(Math.floor(num)) {
			    case 3:
			        school_class = 'Senior';
			        break;
			    case 2:
					school_class = 'Junior';
			        break;
				case 1:
					school_class = 'Sophomore';
					break;
				case 0:
					school_class = 'Freshman';
					break;
			}

			return school_class;
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
