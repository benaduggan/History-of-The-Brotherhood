(function () {
	'use strict';

	angular
	.module('broho.person')
	.controller('PersonListController', PersonListController);

	function PersonListController($rootScope, dataService) {
		var vm = this;
		vm.persons = [];
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
			dataService.get('person/').then(function(promise){
				vm.persons = promise.data;
			})
		}

		function updatePerson(person) {
			if(person.edit){
				if(angular.isUndefined(person.recurring)) {
					person.recurring = 0;
				} else {
					person.recurring = 1;
				}

				dataService.put('person/' + person.id + '/', person).then(function(){
					vm.activate();
					person.edit = false; // on success
				})
			} else {
				person.edit = true;
			}
		}

		function deletePerson(person) {
			if(person.delete){
				dataService.delete('person/' + person.id + '/').then(function(){
					person.delete = false; // on success pop from list
					vm.activate();
				});
			} else {
				person.delete = true;
			}
		}

		function createPerson() {
			if(vm.create){
				dataService.post('person/', vm.form).then(function () {
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
