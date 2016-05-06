(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('AuthController', AuthController);

	function AuthController($rootScope, $state, sessionService) {
		var vm = this;
		vm.form = {};

		vm.activate = activate;
		vm.login = login;
		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Login');
		}

		function login() {
			sessionService.login(vm.form).then(function(){
				$state.transitionTo('map');
			});
		}
	}
})();
