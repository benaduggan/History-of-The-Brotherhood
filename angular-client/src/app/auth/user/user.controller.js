(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('UserController', UserController);

	function UserController($rootScope, $state, dataService) {
		var vm = this;
		vm.form = {};
		vm.userList = [];

		vm.activate = activate;
		vm.getUsers = getUsers;

		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Users');
			vm.getUsers();
		}

		function getUsers() {
			dataService.get('enduser/').then(function (promise) {
				vm.userList = promise.data;
			});
		}

	}
})();
