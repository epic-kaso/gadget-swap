/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module("AdminApp",
    ['ui.select', 'ngSanitize', 'ui.bootstrap', 'ui.router', 'ngAnimate', 'ngResource', 'angular-loading-bar', 'adminApp.directives', 'adminApp.services']);

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
                controller: function () {
                },
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = false;
                    }
                }
            }
        );

        $stateProvider.state('devices.add',
            {
                url: '/add',
                templateUrl:'partials/device_models/add.html',
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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
                templateUrl: 'partials/device_brands/menu.html',
                controller: function () {
                },
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = false;
                    }
                }
            }
        );

        $stateProvider.state('device_brands.add',
            {
                url: '/add',
                templateUrl:'partials/device_brands/add.html',
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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
                controller: function () {
                },
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = false;
                    }
                }
            }
        );

        $stateProvider.state('networks.add',
            {
                url: '/add',
                templateUrl:'partials/networks/add.html',
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
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

    $stateProvider.state('ticket',
        {
            url: '/ticket',
            templateUrl:'partials/ticket/dashboard.html',
            controller: function($state){
            }
        }
    );

    $stateProvider.state('ticket.menu',
        {
            url: '/menu',
            templateUrl:'partials/ticket/menu.html',
            controller: function ($scope, Tickets) {
                $scope.tickets = Tickets;
            },
            resolve:{
                'hasHistory': function($rootScope){
                    $rootScope.hasHistory = false;
                },
                'Tickets': function (TicketServ) {
                    return TicketServ.query({limit: 6});
                }
            }
        }
    );

        $stateProvider.state('ticket.add',
            {
                url: '/add',
                templateUrl: 'partials/ticket/add/base.html',
                controller: function ($scope, $state) {

                },
                resolve:{
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );

        $stateProvider.state('ticket.add.stepOne',
            {
                url: '/step-one',
                templateUrl: 'partials/ticket/add/step-one.html',
                controller: function ($scope, TicketServ, $state) {
                    $scope.createTicket = function (ticket) {
                        TicketServ.save(ticket, function (ticket) {
                            next(ticket.id);
                            console.log(ticket);
                        }, function (ticket) {
                            alert("failed");
                            console.log(ticket);
                        });
                    };

                    function next(id) {
                        $state.go('ticket.add.stepTwo', {'id': id});
                    }
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );

        $stateProvider.state('ticket.add.stepTwo',
            {
                url: '/step-two/{id}',
                templateUrl: 'partials/ticket/add/step-two.html',
                controller: function ($scope, Ticket, $state) {
                    $scope.test = {
                        deviceBoot: '',
                        callUnlock: '',
                        wirelessConnection: '',
                        icloudConnection: ''
                    };
                    $scope.activeNextButton = false;

                    $scope.$watch('test', function (newV, oldV) {
                        console.log('test change');
                        console.log(newV);

                        var ready = checkReadinessForNextStep(newV);
                        setViewState(ready);

                    }, true);

                    $scope.next = function () {
                        $state.go('ticket.add.stepThree', {'id': Ticket.id});
                    };

                    function checkReadinessForNextStep(obj) {
                        var state = {ready: true};

                        angular.forEach(obj, function (value, key) {
                            if (value == 'no') {
                                this.ready = false;
                            }
                        }, state);

                        return state.ready;
                    }

                    function setViewState(ready) {
                        $scope.activeNextButton = ready;
                        if (ready) {
                            $scope.message = "Ok, proceed.";
                        } else {
                            $scope.message = "Sorry, Device doesn't Qualify to Continue";
                        }
                    }
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    },
                    'Ticket': function ($state, $stateParams) {
                        return {id: $stateParams.id};
                    }
                }
            }
        );

        $stateProvider.state('ticket.add.stepThree',
            {
                url: '/step-three/{id}',
                templateUrl: 'partials/ticket/add/step-three.html',
                controller: function ($scope, GradeDeviceServ, $state, Ticket, TicketServ) {
                    $scope.test = {
                        touchScreen: {rating: '', weight: 0.625},
                        lcdScreen: {rating: '', weight: 0.625},
                        deviceCasing: {rating: '', weight: 0.625},
                        deviceKeypad: {rating: '', weight: 0.25},
                        deviceCamera: {rating: '', weight: 0.25},
                        deviceEarPiece: {rating: '', weight: 0.125},
                        deviceSpeaker: {rating: '', weight: 0.125},
                        deviceEarphoneJack: {rating: '', weight: 0.125},
                        deviceChargingPort: {rating: '', weight: 0.25}
                    };

                    $scope.$watch('test', function (newV, oldV) {
                        console.log('test change');
                        console.log(newV);
                        $scope.grade = GradeDeviceServ.getGrade(newV);
                        console.log('Grade:' + $scope.grade);

                    }, true);

                    $scope.next = function () {
                        Ticket.device_grade = $scope.grade;
                        TicketServ.update({id: Ticket.id}, Ticket);

                        $state.go('ticket.add.final', {
                            'id': Ticket.id
                        });
                    }
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    },
                    'Ticket': function (TicketServ, $state, $stateParams) {
                        return TicketServ.get({id: $stateParams.id});
                    }
                }
            }
        );

        $stateProvider.state('ticket.add.final',
            {
                url: '/final/{id}',
                templateUrl: 'partials/ticket/add/final.html',
                controller: function ($scope, Ticket, $state) {
                    $scope.grade = Ticket.device_grade;

                    $scope.next = function () {
                        $state.go('ticket.evaluate', {'id': Ticket.id});
                    }
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    },
                    'Ticket': function (TicketServ, $state, $stateParams) {
                        return TicketServ.get({id: $stateParams.id});
                    }
                }
            }
        );

        $stateProvider.state('ticket.evaluate', {
            url: '/evaluate/{id}',
            templateUrl: 'partials/ticket/evaluation/evaluation.html',
            controller: function ($scope, Networks, Ticket, DeviceBrandsServ, DevicesServ, TicketServ) {
                $scope.networks = Networks;

                $scope.clear = function () {
                    $scope.person.selected = undefined;
                    $scope.address.selected = undefined;
                    $scope.country.selected = undefined;
                };

                $scope.brand = {};
                $scope.refreshBrands = function (brand) {
                    var params = {q: brand};
                    DeviceBrandsServ.query({}, function (brands) {
                        $scope.device_brands = brands;
                    });
                };

                $scope.device = {};
                $scope.refreshDevices = function (brand) {
                    var params = {q: brand};
                    DevicesServ.query({}, function (brands) {
                        $scope.devices = brands;
                    });
                };
            },
            resolve: {
                'hasHistory': function ($rootScope) {
                    $rootScope.hasHistory = true;
                },
                'Ticket': function (TicketServ, $state, $stateParams) {
                    return TicketServ.get({id: $stateParams.id});
                },
                'Networks': function (NetworksServ) {
                    return NetworksServ.query({});
                }
            }
        });

    $stateProvider.state('ticket.search',
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
                },
                'hasHistory': function($rootScope){
                    $rootScope.hasHistory = true;
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


    $urlRouterProvider.otherwise('/ticket/menu');
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


