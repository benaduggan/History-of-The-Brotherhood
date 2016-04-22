(function() {
  'use strict';

  angular
    .module('angularClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.classAnimation = '';
    vm.creationDate = 1461262506594;
    vm.showToastr = showToastr;

    activate();

    function activate() {
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

  }
})();
