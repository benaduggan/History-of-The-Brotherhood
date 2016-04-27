(function () {
	'use strict';

	angular
	.module('broho.auth')
	.controller('AuthController', AuthController);

	function AuthController($rootScope, dataService) {
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
			dataService.post('login', vm.form).then(function(promise){
        window.localStorage['brohoToken'] = promise.data.token;
        window.localStorage['brohoUser'] = promise.data.user;
			});
		}

    function logout() {
			dataService.post('logout').then(function(promise){
          
			});
		}
	}
})();
