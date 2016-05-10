(function () {
	'use strict';

	angular
	.module('broho.picture')
	.controller('PictureListController', PictureListController);

	function PictureListController($rootScope, $scope, dataService) {
		var vm = this;
		vm.activate = activate;
    vm.upload = upload;
    vm.submitPicture=submitPicture;
    vm.getPictues=getPictures;
    vm.form={};
    vm.pictures={};
		vm.activate();
    vm.deletePicture=deletePicture;
    vm.editPicture=editPicture;

		///////////////////////////////////////////////////////////////////////

		function activate() {
			$rootScope.$broadcast('setTitle', 'Picture List');
      upload();
      getPictures();
		}

    function submitPicture(){
      dataService.post('picture/', vm.form).then(function(promise) {
        vm.activate();
			});
      //console.log(vm.form);

    }

    function upload(){
      var yourApiKey = 'AfdtlCgybQwGVFWJfJGXxz'
      filepicker.setKey(yourApiKey);

      document.getElementById("uploadPhotoBtn").onclick = function(){
        filepicker.pick(
          function(Blob){
            vm.form.url = Blob.url;
            $scope.$apply();
            //console.log(Blob.url);

          }
        );
      }
    }

    function getPictures(){
      dataService.get('picture/').then(function(promise) {
        vm.pictures = promise.data;
			});
    }

    function deletePicture(picture){
      if(picture.delete){
        dataService.delete('picture/'+picture.id).then(function(promise) {
          vm.activate();
			  });
      }else{
        picture.delete=true;
      }
    }
    function editPicture(picture){
      if(picture.edit){
        dataService.put('picture/'+picture.id, picture).then(function(promise) {
          vm.activate();
			  });
      }else{
        picture.edit=true;
      }
    }

	}
})();