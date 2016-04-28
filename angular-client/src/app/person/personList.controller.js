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
		vm.createPosition = false;

		vm.activate = activate;
		vm.getPersons = getPersons;
		vm.createPerson = createPerson;
		vm.createPersonPosition = createPersonPosition;
		vm.updatePerson = updatePerson;
		vm.deletePerson = deletePerson;
		vm.deletePerson = deletePerson;
		vm.getPositions = getPositions;
		vm.deletePosition = deletePosition;


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

		function getPositions() {
			dataService.get('position/').then(function(promise){
				vm.positions = promise.data;
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

		function createPersonPosition(person){
			if(vm.createPosition){
				vm.positionForm.person_id = person.id;
				dataService.post('person_position/', vm.positionForm).then(function() {
					vm.createPosition = false;
					vm.positionForm = {};
					vm.activate();
				});
			} else {
				vm.createPosition = true;
			}
		}

		function deletePosition(position){
			if(position.delete){
				dataService.delete('person_position/' + position.id + '/', vm.positionForm).then(function() {
					position.delete = false;
					vm.activate();
				});
			} else {
				position.delete = true;
			}
		}

	}
})();
