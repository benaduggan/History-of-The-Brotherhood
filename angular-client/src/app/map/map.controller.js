(function () {
	'use strict';

	angular
	.module('broho.map')
	.controller('MapController', MapController);

	function MapController($rootScope, dataService) {
		var vm = this;
		vm.maps = [];
		vm.classes = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
		vm.form = {};
		vm.delete = false;
		vm.create = false;

		vm.activate = activate;
		vm.getPersons = getPersons;
		vm.createPerson = createPerson;
		vm.updatePerson = updatePerson;
		vm.deletePerson = deletePerson;


		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			vm.getPersons();
			$rootScope.$broadcast('setTitle', 'Person List');
		}

		function getPersons() {
			dataService.get('map/').then(function(promise){
				vm.maps = promise.data;
			})
		}

		function updatePerson(map) {
			if(map.edit){
				if(angular.isUndefined(map.recurring)) {
					map.recurring = 0;
				} else {
					map.recurring = 1;
				}

				dataService.put('map/' + map.id + '/', map).then(function(){
					vm.activate();
					map.edit = false; // on success
				})
			} else {
				map.edit = true;
			}
		}

		function deletePerson(map) {
			if(map.delete){
				dataService.delete('map/' + map.id + '/').then(function(){
					map.delete = false; // on success pop from list
					vm.activate();
				});
			} else {
				map.delete = true;
			}
		}

		function createPerson() {
			if(vm.create){
				dataService.post('map/', vm.form).then(function () {
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
