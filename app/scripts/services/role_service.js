
define(['services/services'],
  function(services) {

    services.factory('permissionFactory', ['$http', function ($http) {

    $http.defaults.useXDomain = true ;
     var url_prefix = 'http://10.188.192.200:8080';
     var url_premission = '/permission'
    var permissionFactory = {};
  
    ///////////////////////
    //Start  Permission //
    /////////////////////

    permissionFactory.listAllPermissions = function () {
        return $http.get(url_prefix + url_premission +'/all');
    };

    permissionFactory.insertPermission = function (permission) {
        return $http.post(url_prefix + url_premission,permission);
    };

    permissionFactory.delPermission = function (permissionId) {
        return $http.delete(url_prefix + url_premission + '/'+permissionId);
    };

    permissionFactory.updatePermission = function (permission) {
        return $http.put(url_prefix + url_premission + '/'+permission.permissionId,permission);
    };
    
    permissionFactory.addResourcesToPermissions = function (data) {
        // var path = url_prefix + 'permission/addResourcesToPermissions';    
        $http.post(url_prefix + url_premission + '/addResourcesToPermissions',data);
    };

    permissionFactory.delResourcesFromPermissions = function (data) {
        $http.post(url_prefix + url_premission + '/delResourcesFromPermissions',data);
    };
    
    permissionFactory.addPageToPermission = function () {
        var path = url_prefix + 'permission/addPageToPermission';    
        return $http.post(url_prefix + url_premission + '/addPageToPermission');
    };
    
    permissionFactory.listPermissionsByUser = function (userId) {
        // var path = url_prefix + 'permission/listPermissionsByUser';    
        return $http.get(url_prefix + url_premission + '/user/'+userId);
    };

     permissionFactory.listPermissionsByRole = function (roleId) {
        // var path = url_prefix + 'permission/listPermissionsByRole?roleId='+roleId;    
        return $http.get(url_prefix + url_premission + '/role/'+roleId);
    };
    
    permissionFactory.addPermissionsToRoles = function (data) {
        return $http.post(url_prefix + url_premission + '/addPermissionsToRoles',data);
    };
    
    permissionFactory.deletePermissionsFromRoles = function (data) {
        return $http.post(url_prefix + url_premission + '/deletePermissionsFromRoles',data);
    };
    
    // permissionFactory.listResourcesByUser = function (user) {
    //     var path = url_prefix + 'permission/listResourcesByUser';    
    //     return $http.post(path,user);
    // };

    // permissionFactory.listResourcesByUserAndResourceType = function (data) {
    //     var path = url_prefix + 'permission/listResourcesByUserAndResourceType';    
    //     return $http.post(path,data);
    // };
    

  ///////////////////
  //End  Permission //
  ///////////////////
  
  /////////////////
  //Start  Role //
  ///////////////
  
    var url_role = '/role';
    permissionFactory.listAllRoles = function () {
        return $http.get(url_prefix + url_role +'/all');
    };

    permissionFactory.getRoleInfo = function (roleId) {
         return $http.get(url_prefix + url_role + '/'+roleId);
    };

    permissionFactory.getRolePage = function (page) {
         return $http.get(url_prefix + url_role +'/page');
    };

    permissionFactory.insertRole = function (role) {
        return $http.post(url_prefix + url_role + '/'+role.roleId,role);
    };

    permissionFactory.delRole = function (roleId) {
        return $http.delete(url_prefix + url_role + '/'+role.roleId);
    };

    permissionFactory.updateRole = function (roleId,data) {
        return $http.put(url_prefix + url_role + '/'+roleId,data);
    };

    permissionFactory.addRolesToUsers = function (data) {
        return $http.post(url_prefix + url_role + '/addRolesToUsers',data);
    };
    
    permissionFactory.savePermissionsToRoles = function (data) {
        return $http.post(url_prefix + url_role + '/savePermissionsToRoles',data);
    };

    permissionFactory.savePagesToRoles = function (data) {
        return $http.post(url_prefix + url_role + '/savePagesToRoles',data);
    };

    permissionFactory.deleteRolesFromUsers = function (data) {
        return $http.post(url_prefix + url_role + '/deleteRolesFromUsers',data);
    };
    
    // permissionFactory.addResourcesToPages = function (data) {
    //     var path = url_prefix + 'permission/addResourcesToPages';    
    //     return $http.post(path,data);
    // };
    
    // permissionFactory.deleteResourcesFromPages = function (data) {
    //     var path = url_prefix + 'permission/deleteResourcesFromPages';    
    //     return $http.post(path,data);
    // };

  /////////////////
  //End  Role ////
  ///////////////


    return permissionFactory;
  }]);
});