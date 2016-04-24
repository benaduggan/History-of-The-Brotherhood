(function () {
    'use strict';

    angular
        .module('broho.data', [])
        .constant('DATA_API_BASE_URL', 'http://localhost:8000/')
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
      ]);
})();
