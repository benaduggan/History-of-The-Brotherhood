(function () {
	'use strict';

	angular
	.module('broho.position')
	.controller('PositionListController', PositionListController);

	function PositionListController($rootScope, dataService) {
		var vm = this;
		vm.positions = [];
		vm.form = {};
		vm.delete = false;
		vm.create = false;

		vm.activate = activate;
		vm.getPositions = getPositions;
		vm.createPosition = createPosition;
		vm.updatePosition = updatePosition;
		vm.deletePosition = deletePosition;


		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			vm.getPositions();
			$rootScope.$broadcast('setTitle', 'Position List');
		}

		function getPositions() {
			dataService.get('position/').then(function(promise){
				vm.positions = promise.data;
			})
		}

		function updatePosition(position) {
			if(position.edit){
				if(position.recurring === undefined) {
					position.recurring = 0;
				} else {
					position.recurring = 1;
				}

				dataService.put('position/' + position.id + '/', position).then(function(){
					vm.activate();
					position.edit = false; // on success
				})
			} else {
				position.edit = true;
			}
		}

		function deletePosition(position) {
			if(position.delete){
				dataService.delete('position/' + position.id + '/').then(function(){
					position.delete = false; // on success pop from list
					vm.activate();
				});
			} else {
				position.delete = true;
			}
		}

		function createPosition() {
			if(vm.create){
				dataService.post('position/', vm.form).then(function () {
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
