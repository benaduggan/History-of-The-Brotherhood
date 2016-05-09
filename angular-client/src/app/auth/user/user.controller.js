(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('UserController', UserController);

	function UserController($rootScope, $stateParams, $state, dataService, sessionService) {
		var vm = this;
		vm.user = {};
		vm.sessionUser = sessionService.getUser();

		vm.roles = ['user', 'admin'];

		vm.activate = activate;
		vm.getUser = getUser;
		vm.updateUser = updateUser;
		vm.deleteUser = deleteUser;

		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Update User');
			vm.getUser($stateParams.id);
		}

		function getUser(id) {
			dataService.get('enduser/' + id).then(function (promise) {
				vm.user = promise.data;
				vm.user.password = "";
			});
		}

		function updateUser() {
			if(angular.isUndefined(vm.user.verified_floor_member)) {
				vm.user.verified_floor_member = 0;
			} else {
				vm.user.verified_floor_member = 1;
			}
			dataService.put('enduser/' + vm.user.id, vm.user).then(function () {
				$state.go("userList");
			});
		}

		function deleteUser() {
			if(vm.user.delete){
				dataService.delete('enduser/' + vm.user.id + '/').then(function(){
					vm.user.delete = false;
					$state.go("userList");
				});
			} else {
				vm.user.delete = true;
			}
		}

	}
})();
