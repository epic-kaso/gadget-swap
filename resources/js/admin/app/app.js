/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module("AdminApp",['ui.router','ngAnimate','ngResource','angular-loading-bar']);

app.config(['$urlRouterProvider','$stateProvider',
    function($urlRouterProvider,$stateProvider){


        $stateProvider.state('devices',
            {
                url: '/devices',
                templateUrl:'partials/device_models/dashboard.html',
                controller: function($state){
                    $state.go('devices.menu');
                }
            }
        );

        $stateProvider.state('devices.menu',
            {
                url: '/menu',
                templateUrl:'partials/device_models/menu.html',
                controller: function(){}
            }
        );

        $stateProvider.state('devices.add',
            {
                url: '/add',
                templateUrl:'partials/device_models/add.html',
                controller: function($scope,ImageFetcher){
                    $scope.sizes = [];
                    $scope.sizes_string = '';
                    $scope.baseLinePrice = {};
                    $scope.baseLinePriceString = '';
                    $scope.images = [];

                    $scope.fetchImages = function(name){
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function(images){
                            $scope.images = images;
                        });
                    };

                    function createStringVersion(){
                        $scope.sizes_string =  $scope.sizes.join();
                    }

                    $scope.addToSizes = function(device_size){
                        $scope.sizes.push(device_size);
                        $scope.device_size = null;
                        createStringVersion();
                    };

                    $scope.removeSize = function(index){
                        $scope.sizes.splice(index,1);
                        createStringVersion();
                    };

                    $scope.updateBaseLineString = function(){
                        var temp = [];
                        angular.forEach($scope.baseLinePrice,function(value,key){
                            temp.push(""+key+": "+value);
                        });
                        $scope.baseLinePriceString = temp.join();
                    }
                }
            }
        );

        $stateProvider.state('devices.list',
            {
                url: '/list',
                templateUrl:'partials/device_models/list.html',
                controller: function($scope,$http){
                    $scope.deleteItem = function(id){
                        var current = window.location.href,
                            url = window.location.origin +
                                window.location.pathname +
                                '/delete-device/'+id;
                        $http.delete(url).then(function(response){
                            location.reload();
                        },function(response){
                            alert(response);
                        });
                    }
                }
            }
        );


        $stateProvider.state('device_brands',
            {
                url: '/device_brands',
                templateUrl:'partials/device_brands/dashboard.html',
                controller: function($state){
                    $state.go('device_brands.menu');
                }
            }
        );

        $stateProvider.state('device_brands.menu',
            {
                url: '/menu',
                templateUrl:'partials/device_brands/menu.html',
                controller: function(){}
            }
        );

        $stateProvider.state('device_brands.add',
            {
                url: '/add',
                templateUrl:'partials/device_brands/add.html',
                controller: function($scope,ImageFetcher){
                    $scope.fetchImages = function(name){
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function(images){
                            $scope.images = images;
                        });
                    };
                }
            }
        );

        $stateProvider.state('device_brands.list',
            {
                url: '/list',
                templateUrl:'partials/device_brands/list.html',
                controller: function($scope,$http){
                    $scope.deleteItem = function(id){
                        var current = window.location.href,
                            url = window.location.origin +
                                window.location.pathname +
                                '/delete-device/'+id;
                        $http.delete(url).then(function(response){
                            location.reload();
                        },function(response){
                            alert(response);
                        });
                    }
                }
            }
        );

        $stateProvider.state('networks',
            {
                url: '/networks',
                templateUrl:'partials/networks/dashboard.html',
                controller: function($state){
                    $state.go('networks.menu');
                }
            }
        );

        $stateProvider.state('networks.menu',
            {
                url: '/menu',
                templateUrl:'partials/networks/menu.html',
                controller: function(){}
            }
        );

        $stateProvider.state('networks.add',
            {
                url: '/add',
                templateUrl:'partials/networks/add.html',
                controller: function($scope,ImageFetcher){
                    $scope.fetchImages = function(name){
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function(images){
                            $scope.images = images;
                        });
                    };
                }
            }
        );

        $stateProvider.state('networks.list',
            {
                url: '/list',
                templateUrl:'partials/networks/list.html',
                controller: function($scope,$http){
                    $scope.deleteItem = function(id){
                        var current = window.location.href,
                            url = window.location.origin +
                                window.location.pathname +
                                '/delete-device/'+id;
                        $http.delete(url).then(function(response){
                            location.reload();
                        },function(response){
                            alert(response);
                        });
                    }
                }
            }
        );

    $stateProvider.state('inmates',
        {
            url: '/inmates',
            templateUrl:'partials/ticket/dashboard.html',
            controller: function($state){
                $state.go('inmates.menu');
            }
        }
    );

    $stateProvider.state('inmates.menu',
        {
            url: '/menu',
            templateUrl:'partials/ticket/menu.html',
            controller: function(){}
        }
    );

    $stateProvider.state('inmates.search',
        {
            url: '/search?q',
            templateUrl:'partials/ticket/search.html',
            controller: function($scope,result,$stateParams){
                console.log(result);
                $scope.result = result.data;
                $scope.search = $stateParams.q;
            },
            resolve: {
                'result': function($stateParams,$http){
                    return $http.get('/search',{q: $stateParams.q});
                }
            }
        }
    );

    $stateProvider.state('config',
        {
            url: '/config',
            templateUrl:'partials/config/form.html',
            controller: function($scope){
            }
        }
    );


    $urlRouterProvider.otherwise('/inmates/menu');
}]);

app.config(function($httpProvider){

    var interceptor = function($rootScope,$location,$q){

        var success = function(response){
            return response
        };

        var error = function(response){
            if (response.status = 401){
                delete sessionStorage.authenticated;
                $location.path('/');
                //Flash.show(response.data.flash)

            }
            return $q.reject(response)

        };
        return function(promise){
            return promise.then(success, error)
        }
    };
    $httpProvider.interceptors.push(interceptor);

});

app.run(function($http,$rootScope,CSRF_TOKEN){
    $rootScope.CSRF_TOKEN = CSRF_TOKEN;
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
});


app.factory('ImageFetcher',function($http,$q){
    var searchUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAJ_8QtWECvWTcrukqvfLmRWdARJ2bI2rk&cx=011505858740112002603:dap5yb7naau&q=";

    return {
        fetch: function(query){
            var images = [];
            var deferred = $q.defer();
            $http.get(searchUrl+encodeURI(query)).then(function(response){
                console.log(response.data);
                response.data.items.forEach(function(currentValue){
                    if(angular.isDefined(currentValue.pagemap)) {
                        var temp = currentValue.pagemap.cse_image;//cse_thumbnail;
                        if (angular.isDefined(temp) && angular.isArray(temp)) {
                            temp.forEach(function (cValue) {
                                images.push(cValue);
//                                if (cValue.height > cValue.width) {
//                                    images.push(cValue);
//                                }
                            });
                        } else if (angular.isDefined(temp) && angular.isObject(temp)) {
                            images.push(temp);
                        }
                    }
                });
                console.log(images);
                deferred.resolve(images);
            },function(response){
                console.log(response);
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

});