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

		function getUsers() {
			dataService.get('enduser/').then(function (promise) {
				vm.userList = promise.data;
			});
		}

	}
})();
