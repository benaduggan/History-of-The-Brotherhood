(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('UserListController', UserListController);

	function UserListController($rootScope, $state, dataService) {
		var vm = this;
		vm.form = {};
		vm.userList = [];

		vm.activate = activate;
		vm.getUsers = getUsers;
		vm.editUser = editUser;
		vm.deleteUser = deleteUser;
		vm.verifyUser = verifyUser;

		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Users');
			vm.getUsers();
		}

		function editUser(user) {
			$state.go("user", {id: user.id});
		}

		function deleteUser(user) {
			if(user.delete){
				dataService.delete('enduser/' + user.id + '/').then(function(){
					user.delete = false;
					vm.activate();
				});
			} else {
				user.delete = true;
			}
		}

		function verifyUser(action, user) {
			if (user.verify) {
				if (action === 'verify'){
					user.verified_floor_member = 1;
				} else {
					user.verified_floor_member = 0;
				}
				user.password = "";
				dataService.put('enduser/' + user.id, user).then(function () {
					user.verify = false;
					vm.activate();
				});
			} else {
				user.verify = true;
			}
		}

		function getUsers() {
			dataService.get('enduser/').then(function (promise) {
				vm.userList = promise.data;
			});
		}

	}
})();
