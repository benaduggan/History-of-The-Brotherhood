(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('AuthController', AuthController);

	function AuthController($rootScope, $state, sessionService, dataService) {
		var vm = this;
		vm.form = {};
		vm.registrationForm = {};

		vm.activate = activate;
		vm.register = register;
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

		function register() {
			console.log(vm.registrationForm);
			dataService.post('register/', vm.registrationForm).then(function(){
				$state.transitionTo('registrationSuccess');
			});
		}
	}
})();
