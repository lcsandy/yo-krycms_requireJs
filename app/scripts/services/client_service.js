define(['services/services'],
    function (services) {
        services.factory('clientFactory', ['$http', function ($http) {

            var urlBase = 'http://10.188.199.4:8080/YIXUN_1.5_WEB';
//            var urlBase = 'http://10.188.192.41:8080';
            var clientFactory = {};
            var groupUrl = '/group';
            var projectUrl = '/project';
            var clientUrl = '/client';
            var businessUrl = '/business';

            //项目组

            clientFactory.getGroups = function () {
                return $http.get(urlBase + groupUrl + '/all', {cache: true});
            };

            clientFactory.getGroup = function (groupId) {
                return $http.get(urlBase + groupUrl + '/' + groupId, {cache: true});
            };

            clientFactory.insertGroup = function (data) {
                return $http.post(urlBase + groupUrl, data);
            };

            clientFactory.deleteGroup = function (groupId) {
                return $http.delete(urlBase + groupUrl + '/' + groupId);
            };

            clientFactory.updateGroup = function (groupId, data) {
                return $http.put(urlBase + groupUrl + '/' + groupId, data);
            };

            clientFactory.getGroupMangers = function (groupId) {
                return $http.get(urlBase + 'manager/' + groupUrl + '/' + groupId);
            };


            //项目
            clientFactory.getGroupProjects = function (groupId) {
                return $http.get(urlBase + projectUrl + '/group/' + groupId, {cache: true});
            };
            clientFactory.getProject = function (projectId) {
                return $http.get(urlBase + projectUrl + '/' + projectId, {cache: true});
            };

            clientFactory.insertProject = function (data) {
                return $http.post(urlBase + projectUrl, data);
            };

            clientFactory.deleteProject = function (projectId) {
                return $http.delete(urlBase + projectUrl + '/' + projectId);
            };

            clientFactory.updateProject = function (projectId, data) {
                return $http.put(urlBase + projectUrl + '/' + projectId, data);
            };

            //企业
            clientFactory.getBusinessPage = function (data) {
                return $http.post(urlBase + businessUrl + '/page', data);
            };

            clientFactory.getBusiness = function (businessId) {
                return $http.get(urlBase + businessUrl + '/' + businessId, {cache: true});
            };

            clientFactory.insertBusiness = function (data) {
                return $http.post(urlBase + businessUrl, data);
            };

            clientFactory.deleteBusiness = function (businessId) {
                return $http.delete(urlBase + businessUrl + '/' + businessId);
            };

            clientFactory.updateBusiness = function (businessId, data) {
                return $http.put(urlBase + businessUrl + '/' + businessId, data);
            };

            //客户
            clientFactory.getClientPage = function (data) {
                return $http.post(urlBase + clientUrl + '/page', data);
            };

            clientFactory.getClient = function (clientId) {
                return $http.get(urlBase + clientUrl + '/' + clientId, {cache: true});
            };

            clientFactory.insertClient = function (data) {
                return $http.post(urlBase + clientUrl, data);
            };

            clientFactory.deleteClient = function (clientId) {
                return $http.delete(urlBase + clientUrl + '/' + clientId);
            };

            clientFactory.updateClient = function (clientId, data) {
                return $http.put(urlBase + clientUrl + '/' + clientId, data);
            };

            clientFactory.getClinentManagers = function (clientId) {
                return $http.get(urlBase + clientUrl + '/' + clientId + '/manages');
            };

            clientFactory.addManagerToClient = function (clientId, data) {
                return $http.post(urlBase + clientUrl + '/' + clientId + 'manager', data);
            };

            clientFactory.deleteManagerFromClient = function (clientId, managerId) {
                return $http.delete(urlBase + clientUrl + '/' + clientId + 'manager' + managerId);
            };

            clientFactory.deliverManagerToClient = function (clientId, toClientId, managerId) {
                return $http.delete(urlBase + clientUrl + '/' + clientId + 'toClientId/' + toClientId + '/manager' + managerId);
            };

            return clientFactory;
        }]);
    });
