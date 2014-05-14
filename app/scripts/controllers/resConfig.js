define(['controllers/controllers', 'services/resource_service','services/websocket/login'],
  function(controllers) {
  controllers
      .controller('res_configCtrl',function(){})
      .controller('resRegCtrl',['$scope', 'resourceFactory', 'toaster','MyService', function($scope, resourceFactory, toaster,MyService) {

        //注册资源处理fn
        $scope.res={};
        $scope.resType = {};
        $scope.superRes;

        $scope.secondMenus=[];
		//console.log('resRegCtrl');

		listMenus(1);
        var user = {
                userName:'hmm',
                userPassword:'111'
            };
        MyService.doLogin(user);

		//获取所有资源(一二级菜单资源)
		function listMenus(resourceTypeId) {
			resourceFactory.listMenus(resourceTypeId)
			.success(function(menus){
				$scope.menus = menus;

				 for (var i=0;i<menus.length;i++) {
                   var resourceId = menus[i].resourceId;
	               listSubResourcesByType(resourceId,1);
               	}


			})
			.error(function (error) {
				$scope.status = 'Unable to load listmenus data: ' + error.message;
			})
		}

		function listSubResourcesByType(resourceId,resourceTypeId){
			resourceFactory.listSubResourcesByType(resourceId,resourceTypeId)
			.success(function (secondMenus) {

                for (var i=0;i<secondMenus.length;i++) {
	               $scope.secondMenus.push(secondMenus[i]);
               	}
			})
			.error(function (err){
				$scope.status = 'Unable to load pagesdata data: ' + error.message;
			})
		}

        $scope.show = function(){
            console.log("show1");
            
        }


        //注册资源处理fn
		$scope.insertRes = function (type){

            console.log(type);

            switch(type){
                case 'module':
                case 'menu':
                    $scope.res.resourceTypeId =1;
                    // $scope.res.yxResourceType = 1;
                    break;
                case 'page':
                    $scope.res.resourceTypeId =2;
                    // $scope.res.yxResourceType.resourceId = 2;
                    break;
            }

            console.log($scope);
            var data= {
                resource:$scope.res,
                resourceType:$scope.resType,
                superResourceId:this.superRes

            }
            console.log(data);
            resourceFactory.insertResource(data)
                .success(function () {
                    $scope.status = 'Insert res success!';
                })
                .error(function (e) {
                    $scope.status = 'Unable to insert res: ' + e.message;
                })
        }


	}])
    .controller('resEditCtrl',['$scope', 'resourceFactory', 'toaster', function ($scope, resourceFactory, toaster) {

        $scope.res = {};
        $scope.resType = {};
        $scope.secondMenus=[];
        console.log('resEditCtrl');
        listMenus(1);
        listPages(2);

        function listMenus(resourceTypeId) {
            resourceFactory.listMenus(resourceTypeId)
                .success(function(menus){
                    $scope.menus = menus;

                    for (var i=0;i<menus.length;i++) {
                        var resourceId = menus[i].resourceId;
                        listSubResourcesByType(resourceId,1);
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listmenus data: ' + error.message;
                })
        }

        function listSubResourcesByType(resourceId,resourceTypeId){
            resourceFactory.listSubResourcesByType(resourceId,resourceTypeId)
                .success(function (secondMenus) {

                    for (var i=0;i<secondMenus.length;i++) {
                        $scope.secondMenus.push(secondMenus[i]);
                    }
                })
                .error(function (err){
                    $scope.status = 'Unable to load pagesdata data: ' + error.message;
                })
        }

        //获取所有页面资源
        function listPages(resourceTypeId) {
            resourceFactory.listResourcesByType(resourceTypeId)
                .success(function (pages) {
                    $scope.pages = pages;
                })
                .error(function (err){
                    $scope.status = 'Unable to load pagesdata data: ' + error.message;
                })
        }

        $scope.getResource = function(resourceId) {

            // var resourceId = $scope.res.resourceId;

            console.log('asccas');
            console.log(resourceId);

            // console.log($scope);
            resourceFactory.getResource(resourceId)
                .success(function (resource) {
                    $scope.res = resource;
                    console.log($scope.res);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load Resource data: ' + error.message;
                });
        }

        $scope.editRes = function() {
            // console.log
            // console.log($scope);
            var data= {
                resource:$scope.res,
            }
            // console.log(data);
            resourceFactory.updateResource($scope.res.resourceId,data)
            .success(function(data){
                console.log(data);
                if (data.resultCode == 200) {
                    toaster.pop('success', "操作成功", "编辑资源成功", 3000);
                }
                $scope.status = "resource updateResource succeed!";
            })
            .error(function(err){
                toaster.pop('error', "操作失败", '编辑模块资源失败，请检查您的表单数据尝试重新提交！');
                $scope.stauts = "resource updateResource error:"+err;
            });
        }
    }]);
});
