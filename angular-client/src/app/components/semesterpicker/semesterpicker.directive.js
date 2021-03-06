(function() {
  'use strict';

  angular
    .module('broho')
    .directive('semesterpicker', semesterpicker);

  /** @ngInject */
  function semesterpicker() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/semesterpicker/semesterpicker.html',
      controller: SemesterPickerController,
      controllerAs: 'vm',
      bindToController: true,
      require: "?ngModel",
      scope: {
          consumerModel: '=ngModel'
      }
    };
    return directive;

    /** @ngInject */
    function SemesterPickerController($element, $scope) {
        var vm = this;
        vm.semesters = ['Fall', 'Spring'];
        vm.years = [];

        vm.semester_model = {
            year: '',
            semester: ''
        };

        vm.createYears = createYears;
        activate();

        ///////////////////////////////////////////////////////////

        function activate() {
            vm.createYears();
            vm.form = $element.controller('form');
            if (vm.consumerModel){
                vm.semester_model.semester = vm.consumerModel.split('-')[0];
                vm.semester_model.year = vm.consumerModel.split('-')[1];
            }
            $scope.$watchCollection('vm.semester_model', buildSemester); // Every time the interface is changed, the value is updated
        }

        function buildSemester() {
            vm.consumerModel = vm.semester_model.semester + "-" + vm.semester_model.year;
        }

        function createYears() {
            for(var x = 2016; x > 1980; x--){
                vm.years.push(x);
            }
        }
    }
  }

})();
