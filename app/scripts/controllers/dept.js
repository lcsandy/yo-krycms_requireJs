
define(['controllers/controllers', 'services/dept_service'],
 function(controllers) {
  controllers.controller('DeptCtrl', function ($scope, deptFactory, $modal) {
  	console.log("deptCtrl");
	$scope.status;
    $scope.depts;
	getDepts();


    function getDepts() {
        deptFactory.getDepts()
            .success(function (depts) {
                $scope.depts = depts;
            })
            .error(function (error) {
                $scope.status = 'Unable to load depts data: ' + error.message;
            });
    }


    function delDept (deptId){
        //console.log(deptId);
        deptFactory.deleteDept(deptId)
            .success(function () {
                $scope.status = 'Delete Dept ok!';
            })
            .error(function(error) {
                $scope.status = 'Unable to delete Dept: ' + error.message;
            });
    }

    $scope.delDeptDialog = function (deptId) {
        var deleteDept = confirm('确定删除部门?');

        if (deleteDept) {
            delDept(deptId);
        }
    };


  })
  //获取部门详细数据
   .controller('emplCtrl',  ['$scope', '$stateParams', 'deptFactory', 
        function ($scope, $stateParams, deptFactory) {
    console.log("emplCtrl2");
    
    $scope.status;
    $scope.depts;
    $scope.dept;

    getDept($stateParams.deptId);
    getDepts();
    getDeptsAndEmployees();

    function getDeptsAndEmployees() {
        deptFactory.getDeptsAndEmployees()
            .success(function (depts) {
                console.log("add");
                console.log(depts);
                $scope.deptsandEmployees = depts;
                $scope.departmentManagerId = [1];
            })
            .error(function (error) {
                $scope.status = 'Unable to load depts data: ' + error.message;
            });
        // return depts;
    }



    function getDept(deptId) {

        deptFactory.getDept(deptId)
        .success(function (dept) {
            $scope.dept = dept;
            console.log("getDept");
        })
        .error(function (error) {
            $scope.status = 'Unable to load dept data: ' + error.message;
        });
    }
    function getDepts() {
        deptFactory.getDepts()
            .success(function (depts) {
                $scope.depts = depts;
                console.log("getDepts");
            })
            .error(function (error) {
                $scope.status = 'Unable to load depts data: ' + error.message;
            });
    }

    $scope.master = {};


    $scope.updateDept = function (dept) {

        console.log($scope.dept.departmentId);
        // console.log($scope.superDepartmentId.departmentId);
        $scope.master = angular.copy(dept);
        var data = {
            department:dept,
            // superDepartmentId:$scope.superDepartmentId.departmentId,
            departmentManagerId:$scope.departmentManagerId,
            viceDepartmentManagerId:$scope.viceDepartmentManagerId,
            directDepartmentManagerId:$scope.directDepartmentManagerId,
            separateDepartmentManagerId:$scope.separateDepartmentManagerId
          }

        deptFactory.updateDept(dept.departmentId,data)   
        .success(function () {
            $scope.status = 'Updated Dept! Refreshing customer list.';
        })
        .error(function (error) {
            $scope.status = 'Unable to update Dept: ' + error.message;
        });
    };

    $scope.isUnchanged = function(dept){
     return angular.equals(dept, $scope.master);
    };
    $scope.isSave = function(dept) {
     return angular.isDefined(dept) && dept != null;
    };
    
    $scope.isSubmit = function(dept) {
     return  angular.isUndefined(dept)|| dept == null;
    };


}])
.controller('DeptAddCtrl', function ($scope, deptFactory) {
  
    getDeptsAndEmployees();

    function getDeptsAndEmployees() {
        deptFactory.getDeptsAndEmployees()
            .success(function (depts) {
                console.log("add");
                console.log(depts);
                $scope.depts = depts;
                $scope.departmentManagerId = [1];
                console.log($scope.departmentManagerId);
            })
            .error(function (error) {
                $scope.status = 'Unable to load depts data: ' + error.message;
            });
        // return depts;
    }

    $scope.show = function(value){
        console.log(value);
    }

    $scope.multi = {
        multiple: true,
        query: function (query) {
          query.callback({ results: states });
        },
        initSelection: function(element, callback) {
          var val = $(element).select2('val'),
            results = [];
          for (var i=0; i<val.length; i++) {
            results.push(findState(val[i]));
          }
          callback(results);
        }
      };

    $scope.insertDept = function (dept) {
        var dept1 = angular.copy(dept);
        var data = {
            department:dept1,
            // superDepartmentId:$scope.superDepartmentId.departmentId,
            departmentManagerId:$scope.departmentManagerId,
            viceDepartmentManagerId:$scope.viceDepartmentManagerId,
            directDepartmentManagerId:$scope.directDepartmentManagerId,
            separateDepartmentManagerId:$scope.separateDepartmentManagerId
          }

        deptFactory.insertDept(data)
        .success(function () {
            $scope.status = 'Inserted Dept! Refreshing customer list.';
            $scope.depts.push(dept);
        })
        .error(function(error) {
            $scope.status = 'Unable to insert Dept: ' + error.message;
        });
    };
});
});
    