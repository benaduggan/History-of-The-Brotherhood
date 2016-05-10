(function () {
	'use strict';

	angular
	.module('broho.picture')
	.controller('PictureListController', PictureListController);

	function PictureListController($rootScope, $scope, dataService) {
		var vm = this;
		vm.addPicture = false;
		vm.form={};
		vm.pictures = {};
		vm.typeIdResults = [];

		vm.upload = upload;
		vm.submitPicture = submitPicture;
		vm.getPictues = getPictures;
		vm.deletePicture = deletePicture;
		vm.editPicture = editPicture;
		vm.getTheThings = getTheThings;
		vm.formatValue = formatValue;
		vm.activate = activate;

		vm.activate();

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Picture List');
			getPictures();
		}

		function submitPicture(){
			dataService.post('picture/', vm.form).then(function(promise) {
				vm.activate();
				vm.addPicture = false;
			});
		}

		function getTheThings() {
			dataService.get(vm.form.table_type + '/').then(function(promise) {
				vm.typeIdResults = promise.data;
			})
		}

		function formatValue(type) {
			switch (vm.form.table_type) {
				case "enduser":
					return type.first_name + ' ' + type.last_name;
				case "person":
					return type.first_name + ' ' + type.last_name;
				case "room":
					return type.room_num;
				case "floor":
					return type.name;
				default:
					return type;

			}
		}

		function upload(){
			var yourApiKey = 'AfdtlCgybQwGVFWJfJGXxz'
			filepicker.setKey(yourApiKey);
			filepicker.pick(function(Blob){
				vm.form.url = Blob.url;
				$scope.$apply();
			});
		}

		function getPictures() {
			dataService.get('picture/').then(function(promise) {
				vm.pictures = promise.data;
			});
		}

		function deletePicture(picture) {
			if(picture.delete) {
				dataService.delete('picture/'+picture.id).then(function(promise) {
					vm.activate();
				});
			} else {
				picture.delete=true;
			}
		}

		function editPicture(picture) {
			if(picture.edit){
				dataService.put('picture/'+picture.id, picture).then(function(promise) {
					vm.activate();
				});
			} else {
				picture.edit=true;
			}
		}
	}
})();
