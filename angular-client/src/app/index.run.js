(function() {
  'use strict';

  angular
    .module('broho')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
