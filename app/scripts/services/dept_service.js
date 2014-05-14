define(['services/services'],
    function (services) {
        services.factory('deptFactory', ['$http', function ($http, utils) {
//            var urlBase = 'http://10.188.199.4:8080/YIXUN_1.5_WEB';
//            var urlBase = 'http://10.188.192.41:8080';
            var urlBase = 'http://10.188.192.200:8000';
            var deptFactory = {};
            var deptUrl = "/department";

            deptFactory.getDepts = function () {
                return $http.get(urlBase + deptUrl + '/all', {cache: true});
            };
            deptFactory.getDeptsAndEmployees = function () {
                return $http.get(urlBase + deptUrl + '/departments/employees', {cache: true});
            };

            deptFactory.getDept = function (deptId) {
                return $http.get(urlBase + deptUrl + '/' + deptId, {cache: true});
            };

            deptFactory.insertDept = function (data) {
                return $http.post(urlBase + deptUrl, data);
            };

            deptFactory.deleteDept = function (deptId) {
                return $http.delete(urlBase + deptUrl + '/' + deptId);
            };

            deptFactory.updateDept = function (deptId, data) {
                return $http.put(urlBase + deptUrl + '/' + deptId, data);
            };

            deptFactory.getDepartmentJobTitles = function (deptId) {
                return $http.get(urlBase + '/jobTitle/department/' + deptId);
            }

            deptFactory.getDepartmentPositions = function (deptId) {
                return $http.get(urlBase + '/position/department/' + deptId);
            }

            //遍历出所有部门、部门下所有职位、职位下所有员工的级联
            deptFactory.listDepartmentPositionsEmployees = function () {
                return $http.get(urlBase + '/listDepartmentPositionsEmployees', {cache: true});
            }

            //获取所有领导
            deptFactory.getAllLeader = function () {
                return $http.get(urlBase + '/allLeader', {cache: true});
            }

            //获取所有主办银行经理
            deptFactory.getAllHostor = function () {
                return $http.get(urlBase + '/allHostManager', {cache: true});
            }

            //获取所有协办银行经理
            deptFactory.getAllAssister = function () {
                return $http.get(urlBase + '/allAssistManager', {cache: true});
            }

            return deptFactory;
        }])

            .factory('utils', function () {

                return {

                    // Util for finding an object by its 'id' property among an array
                    findById: function findById(a, id) {
                        for (var i = 0; i < a.length; i++) {
                            if (a[i].id == id) return a[i];
                        }
                        return null;
                    },

                    // Util for returning a randomKey from a collection that also isn't the current key
                    newRandomKey: function newRandomKey(coll, key, currentKey) {
                        var randKey;
                        do {
                            randKey = coll[Math.floor(coll.length * Math.random())][key];
                        } while (randKey == currentKey);
                        return randKey;
                    }

                };

            });
    });