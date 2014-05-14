
define(['controllers/controllers', 'services/empl_service','services/dept_service'],
 function(controllers) {
  controllers.controller('employeeCtrl', function ($scope,$stateParams,emplFactory) {
  	console.log("eeeeeeeeEmployeeCtrl");

	$scope.status;
  $scope.employees;
  $scope.employee;

	 getEmployeePage($stateParams.deptId);

   function getEmployeePage(data) {

        $scope.dtOptions = {
                  "bProcessing": true,
                  "bServerSide": true,
                  iDisplayLength: 5,
                  sAjaxSource: 'http://10.188.192.41:8080/employee/page?deptId='+ data,
                  sAjaxDataProp: 'aaData',
                  "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                  sPaginationType: "full_numbers",
                  "aoColumns":
                    [
                        { "mData": function(data,type,full) {
                                return '<a class="emplyeeInfoLink" href="javascript:;">测试数据</a>';
                          }
                        },
                        { "mData": "employeeName",
                          "sClass": "center"
                        },
                        { "mData": "employeeEmail" },
                        { "mData": "employeeMobilePhoneMaster" }

                    ],
                  /*"aoColumnDefs":[
                    {
                        "aTargets":[4],
                        "mData": null
                    }
                  ],*/
                  "fnServerData": function( sUrl, aoData, fnCallback, oSettings ) {
                      oSettings.jqXHR = $.ajax({
                        "url": sUrl,
                        beforeSend: function(xhr) {
                          xhr.withCredentials = true;
                        },
                        "data": aoData,
                        "type": 'get',
                        "success": fnCallback,
                        "cache": false
                      });
                  }
                }

    }

    $scope.master = {};

    $scope.updateEmployee = function (employee) {
        $scope.master = angular.copy(employee);

      	var data = {
            employee:employee,
            userName:userName,
            userPassword:userPassword,
            sexId:sexId,
            jobTitleId:jobTitleId,
            departementId:departementId
          }

        emplFactory.updateEmployee(data)
        .success(function () {
            $scope.status = 'Updated Employee! Refreshing customer list.';
        })
        .error(function (error) {
            $scope.status = 'Unable to update Employee: ' + error.message;
        });
    };




	$scope.isEdit = function(){

	};


  })
.controller('employeeAddCtrl', function ($scope,emplFactory,deptFactory) {

    $scope.masterDepts;
    $scope.masterJobTitles;
    $scope.secondDepts;
    $scope.secondJobTitles;
    getAllDepts();

    function getAllDepts(){
        deptFactory.getDepts()
         .success(function (depts) {
              $scope.masterDepts = depts;
              $scope.secondDepts = depts;
          })
          .error(function (error) {
              $scope.status = 'Unable to load depts data: ' + error.message;
          });
    }

    $scope.showMaster = function(){

      // console.log(this);
      // console.log($scope);
      var deptId = $scope.masterDepartmentId.departmentId;
      deptFactory.getDepartmentJobTitles(deptId)
        .success(function (jobTitles) {
              $scope.masterJobTitles = jobTitles;
          })
          .error(function (error) {
              $scope.status = 'Unable to load jobTitles data: ' + error.message;
          });
      deptFactory.getDepartmentPositions(deptId)
        .success(function (positions) {
              $scope.masterPositions = positions;
          })
          .error(function (error) {
              $scope.status = 'Unable to load positions data: ' + error.message;
          });

    }

    $scope.showSecond = function(){

      // console.log(this);
      // console.log($scope);
      var deptId = $scope.secondDepartmentId.departmentId;
      deptFactory.getDepartmentJobTitles(deptId)
        .success(function (jobTitles) {
              $scope.secondJobTitles = jobTitles;
          })
          .error(function (error) {
              $scope.status = 'Unable to load depts data: ' + error.message;
          });

      deptFactory.getDepartmentPositions(deptId)
        .success(function (positions) {
              $scope.secondPositions = positions;
          })
          .error(function (error) {
              $scope.status = 'Unable to load positions data: ' + error.message;
          });
    }

    $scope.insertEmployee = function (employee) {
      console.log($scope);
        var departmentId = [];
         var jobTitleId = [];
         var positionId = [];
        departmentId[0] = $scope.masterDepartmentId.departmentId;
        departmentId[1] = $scope.secondDepartmentId.departmentId;
        jobTitleId[0] = $scope.masterJobTitleId.jobTitleId;
        jobTitleId[1] = $scope.secondJobTitleId.jobTitleId;
        positionId[0] = $scope.masterPositionId.positionId;
        positionId[1] = $scope.secondPositionId.positionId;
         console.log(positionId);
         // console.log(departementId);

        var data = {
            employee:employee,
            userName:$scope.userName,
            userPassword:$scope.userPassword,
            sexId:$scope.sexId,
            departmentId:departmentId,
            jobTitleId:jobTitleId,
            positionId:positionId

        }
        console.log(data);

        emplFactory.insertEmployee(data)
        .success(function () {
            $scope.status = 'Inserted Employee! Refreshing customer list.';
            $scope.employees.push(employee);
        })
        .error(function(error) {
            $scope.status = 'Unable to insert Employee: ' + error.message;
        });
    };

    $scope.clearEmployee = function(){
        $scope.employee = {};
    }
})
.controller('employeeUpdateCtrl', function ($scope,$stateParams,emplFactory,deptFactory) {

    $scope.employee;
    $scope.user;
    $scope.masterDepts;
    $scope.masterJobTitles;
    $scope.secondDepts;
    $scope.secondJobTitles;
    $scope.selectedJobTitles ;
    $scope.selectedPositions ;
    console.log("employeeUpdateCtrl");
    console.log($stateParams.employeeId);
    getEmployee($stateParams.employeeId);
    getAllDepts();

    function getEmployee(employeeId){
        emplFactory.getEmployee(employeeId)
        .success(function (employee) {
              $scope.employee = employee;
              console.log($scope.employee);
              $scope.master = angular.copy($scope.employee);
              getUserByEmployee(employee.employeeId);
              getDepartmentsByEmployee(employee.employeeId);
          })
          .error(function (error) {
              $scope.status = 'Unable to load employee data: ' + error.message;
          });
    }

    function getUserByEmployee(employeeId){
        emplFactory.getUserByEmployee(employeeId)
        .success(function (user) {
              $scope.user = user;
          })
          .error(function (error) {
              $scope.status = 'Unable to load employee data: ' + error.message;
          });
    }

    function getDepartmentsByEmployee(employeeId){
        emplFactory.getDepartmentsByEmployee(employeeId)
        .success(function (departments) {
              $scope.selectedDepartments = departments;
              console.log("selectedDepartments:");
              console.log($scope.selectedDepartments);
              for (var i=0;i<departments.length;i++) {
                  console.log(departments[i]);
                  var departmentId = departments[i].departmentId;
                  console.log(departmentId);
                  getJobTitleByEmployeeAndDepartment(employeeId,departmentId);
                  getPositionByEmployeeAndDepartment(employeeId,departmentId);
              }
              //  for (var department in departments) {
              //     console.log(department);
              //     var departmentId = department.departmentId;
              //     console.log(departmentId);
              //     getJobTitleByEmployeeAndDepartment(employeeId,departmentId);
              //     getPositionByEmployeeAndDepartment(employeeId,departmentId);
              // }

          })
          .error(function (error) {
              $scope.status = 'Unable to load selectedDepartments data: ' + error.message;
          });
    }


    function getJobTitleByEmployeeAndDepartment(employeeId,departementId){
        emplFactory.getJobTitleByEmployeeAndDepartment(employeeId,departementId)
        .success(function (jobTitle) {
              console.log(jobTitle);
              // $scope.selectedJobTitles.push(jobTitle[0]);
              // console.log("selectedJobTitle:");
              // console.log($scope.selectedJobTitles);
          })
          .error(function (error) {
              $scope.status = 'Unable to load jobTitle data: ' + error.message;
          });
    }

    function getPositionByEmployeeAndDepartment(employeeId,departementId){
        emplFactory.getPositionByEmployeeAndDepartment(employeeId,departementId)
        .success(function (position) {
              console.log(position);
              // $scope.selectedPositions.push(position[0]);
              //  console.log("selectedPosition:");
              //  console.log($scope.selectedPositions);
          })
          .error(function (error) {
              $scope.status = 'Unable to load position data: ' + error.message;
          });
    }

    function getAllDepts(){
        deptFactory.getDepts()
         .success(function (depts) {
              $scope.masterDepts = depts;
              $scope.secondDepts = depts;
          })
          .error(function (error) {
              $scope.status = 'Unable to load depts data: ' + error.message;
          });
    }

    $scope.showMaster = function(){

      // console.log(this);
      // console.log($scope);
      var deptId = $scope.masterDepartmentId.departmentId;
      deptFactory.getDepartmentJobTitles(deptId)
        .success(function (jobTitles) {
              $scope.masterJobTitles = jobTitles;
          })
          .error(function (error) {
              $scope.status = 'Unable to load jobTitles data: ' + error.message;
          });
      deptFactory.getDepartmentPositions(deptId)
        .success(function (positions) {
              $scope.masterPositions = positions;
          })
          .error(function (error) {
              $scope.status = 'Unable to load positions data: ' + error.message;
          });

    }

    $scope.showSecond = function(){

      // console.log(this);
      // console.log($scope);
      var deptId = $scope.secondDepartmentId.departmentId;
      deptFactory.getDepartmentJobTitles(deptId)
        .success(function (jobTitles) {
              $scope.secondJobTitles = jobTitles;
          })
          .error(function (error) {
              $scope.status = 'Unable to load depts data: ' + error.message;
          });

      deptFactory.getDepartmentPositions(deptId)
        .success(function (positions) {
              $scope.secondPositions = positions;
          })
          .error(function (error) {
              $scope.status = 'Unable to load positions data: ' + error.message;
          });
    }

    $scope.updateEmployee = function (employee) {
      console.log($scope);
        var departmentId = [];
         var jobTitleId = [];
         var positionId = [];
        departmentId[0] = $scope.masterDepartmentId.departmentId;
        departmentId[1] = $scope.secondDepartmentId.departmentId;
        jobTitleId[0] = $scope.masterJobTitleId.jobTitleId;
        jobTitleId[1] = $scope.secondJobTitleId.jobTitleId;
        positionId[0] = $scope.masterPositionId.positionId;
        positionId[1] = $scope.secondPositionId.positionId;
         console.log(positionId);
         // console.log(departementId);

        var data = {
            employee:employee,
            user:$scope.user,
            // userName:$scope.userName,
            // userPassword:$scope.userPassword,
            // sexId:$scope.sexId,
            departmentId:departmentId,
            jobTitleId:jobTitleId,
            positionId:positionId

        }
        console.log(data);

        emplFactory.updateEmployee(employee.employeeId,data)
        .success(function () {
            $scope.status = 'updated Employee! Refreshing customer list.';
        })
        .error(function(error) {
            $scope.status = 'Unable to updated Employee: ' + error.message;
        });
    };

    $scope.clearEmployee = function(){
        console.log($scope.master);
        $scope.employee = angular.copy($scope.master);
        console.log($scope.employee);
    }
});
});
 