define(['app', 'controllers/menu', 'controllers/resource', 'controllers/login'], function (app) {
    "use strict";
    return app
        .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/public/login');
                //公共模块
                $stateProvider
                    .state('public', {
                        url: "/public",
                        abstract: true,
                        templateUrl: "index.html"
                    })
                    .state('public.404', {
                        url: '/404',
                        views: {
                            'dashbord@': {
                                templateUrl: 'views/404.html'
                            }
                        }
                    })
                    .state('public.login', {
                        url: '/login',
                        views: {
                            'dashbord@': {
                                templateUrl: 'views/login.html',
                                controller: 'loginCtrl'
                            }
                        }
                    });

                //首页初始化 工作台
                $stateProvider
                    .state("home", {
                        url: '/home',
                        abstract: true,
                        templateUrl: 'index.html'
                    })
                    .state("home.index", {
                        url: "/dashbord",
                        views: {
                            'menu@': {
                                templateUrl: 'views/menu.html',
                                controller: 'menuCtrl'
                            },
                            'dashbord@': {
                                templateUrl: 'views/dashbord.html'
                            }
                        }
                    })

                    //具体到模块
                    .state('home.index.module', {
                        url: '/module?page&res',
                        views: {
                            'submenu': {
                                templateUrl: 'views/submenu.html',
                                controller: 'submenuCtrl'
                            },
                            'content': {
                                templateUrl: function ($stateParams) {
                                    return 'views/' + $stateParams.page + '.html'
                                },
                                controllerProvider: function ($stateParams) {
                                    var ctrlName = $stateParams.page + 'Ctrl';
                                    return ctrlName;
                                }

                            }
                        }
                    })

            }])
        //登录权限判断
        .run(['$rootScope', '$state', 'loginFactory', function ($rootScope, $state, loginFactory) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                /*if (!Auth.authorize(toState.data.access)) {
                 $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                 event.preventDefault();

                 if(fromState.url === '^') {
                 if(Auth.isLoggedIn()) {
                 $state.go('user.home');
                 } else {
                 $rootScope.error = null;
                 $state.go('anon.login');
                 }
                 }
                 }*/
            });

        }]);


});