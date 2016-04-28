(function () {
    'use strict';

    angular
        .module('broho.data')
        .factory('sessionService', sessionService);


        function sessionService($rootScope, $http, $window, dataService, DATA_API_BASE_URL) {
        var service = {
                login: login,
                logout: logout
            };

        return service;

        ///////////////////////////////////////////////////////////////////////

        function login(form) {
			return dataService.post('login', form).then(function(promise){
                $window.localStorage['brohoToken'] = promise.data.token;
                $window.localStorage['brohoUser'] = JSON.stringify(promise.data.user);
                $rootScope.$broadcast('authenticated', true);
			});
		}

        function logout() {
            return dataService.delete('logout').then(function(promise){
                $window.localStorage.removeItem("brohoToken")
                $rootScope.$broadcast('authenticated', false);
            });
        }

        function baseUrl() {
            return DATA_API_BASE_URL;
        }
    }
})();
