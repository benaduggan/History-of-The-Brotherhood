(function() {
  'use strict';

  angular
    .module('broho')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      // .state('blah', {
        // url: '/',
        // template: 'app/static/main.html',
      // });

    $urlRouterProvider.otherwise('/home');
  }

})();
