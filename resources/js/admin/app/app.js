/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module("AdminApp",
    ['ui.select', 'ngSanitize',
        'ui.bootstrap', 'ui.router',
        'ngAnimate', 'ngResource',
        'angular-loading-bar', 'adminApp.directives',
        'adminApp.services', 'ngCookies']);

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
                    },
                    'DeviceBrands': function (DeviceBrandsServ) {
                        return DeviceBrandsServ.query({only: true});
                    }
                },
                controller: function ($scope, ImageFetcher, DeviceBrands) {

                    $scope.models = DeviceBrands;

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
                    },
                    'Devices': function (DevicesServ) {
                        return DevicesServ.query({});
                    }
                },
                controller: function ($scope, DevicesServ, Devices) {
                    $scope.models = Devices;
                    $scope.deleteItem = function (id) {
                        DevicesServ.delete({id: id}, function (response) {
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
                    },
                    'DeviceBrands': function (DeviceBrandsServ) {
                        return DeviceBrandsServ.query({only: true});
                    }
                },
                controller: function ($scope, $http, DeviceBrandsServ, DeviceBrands) {
                    $scope.brands = DeviceBrands;
                    $scope.deleteItem = function(id){
                        DeviceBrandsServ.delete({id: id}, function (response) {
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
                    'Networks': function (NetworksServ) {
                        return NetworksServ.query({});
                    },
                    'hasHistory': function($rootScope){
                        $rootScope.hasHistory = true;
                    }
                },
                controller: function ($scope, Networks, NetworksServ) {
                    $scope.networks = Networks;
                    $scope.deleteItem = function(id){
                        NetworksServ.delete({id: id}, function (response) {
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
                $state.go('ticket.menu');
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
                            'id': Ticket.id,
                            'grade': $scope.grade
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
                url: '/final/{id}/{grade}',
                templateUrl: 'partials/ticket/add/final.html',
                controller: function ($scope, Ticket, $state, $stateParams) {
                    $scope.grade = $stateParams.grade || Ticket.device_grade;

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
            controller: function ($scope, $filter, Networks, Ticket, TicketServ, DeviceBrandsServ, GadgetEvaluationReward, $state) {
                $scope.ticket = Ticket;

                $scope.selected = {grade: Ticket.device_grade};

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
                        console.log(brands);
                        $scope.device_brands = brands;
                    });
                };

                $scope.device = {};
                $scope.refreshDevices = function (brand) {
                    $scope.devices = $filter('filter')($scope.brand.selected.gadgets, {model: brand});
                };

                $scope.$watch('brand.selected', function (newV, oldV) {
                    console.log('brand changed');
                    $scope.selected.brand = newV;
                });

                $scope.$watch('device.selected', function (newV, oldV) {
                    console.log('device changed');
                    $scope.selected.device = newV;
                });

                $scope.next = function () {
                    var reward = GadgetEvaluationReward.calculate($scope.selected);
                    updateTicket($scope.selected, reward);
                    $state.go('ticket.reward', {
                        'id': Ticket.id
                    });
                };

                $scope.goHome = function () {
                    $state.go('ticket.menu');
                }

                function updateTicket(selected, reward) {
                    Ticket.gadget_id = selected.device.id;
                    Ticket.size_id = selected.size;
                    Ticket.network_id = selected.network;
                    Ticket.reward = reward;

                    TicketServ.update({id: Ticket.id}, Ticket);
                }

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

        $stateProvider.state('ticket.reward',
            {
                url: '/reward/{id}',
                templateUrl: 'partials/ticket/evaluation/reward.html',
                controller: function ($scope, Ticket, TicketServ, GadgetEvaluationReward, Airtel, $state) {
                    $scope.reward = GadgetEvaluationReward.getLastReward();// Ticket.reward;
                    $scope.ticket = Ticket;
                    $scope.airtel = Airtel;

                    $scope.goHome = function () {
                        $state.go('ticket.menu');
                    };

                    $scope.next = function () {
                        updateTicket();
                        $state.go('ticket.accept-terms', {id: Ticket.id});
                    };

                    function updateTicket() {
                        Ticket.port_to_airtel = $scope.portToAirtel;

                        TicketServ.update({id: Ticket.id}, Ticket);
                    }
                },
                resolve: {
                    'Airtel': function (GadgetEvaluationReward) {
                        return GadgetEvaluationReward.fetchAirtelBonus();
                    },
                    'Ticket': function (TicketServ, $state, $stateParams) {
                        return TicketServ.get({id: $stateParams.id});
                    },
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );

        $stateProvider.state('ticket.accept-terms',
            {
                url: '/accept-terms/{id}',
                templateUrl: 'partials/ticket/evaluation/terms.html',
                controller: function ($scope, $stateParams, $state) {
                    $scope.next = function () {
                        $state.go('ticket.review-ticket', {id: $stateParams.id});
                    };
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );


        $stateProvider.state('ticket.review-ticket',
            {
                url: '/review/{id}',
                templateUrl: 'partials/ticket/evaluation/review.html',
                controller: function ($scope, Ticket, TicketServ, $state, MailServ) {
                    $scope.ticket = Ticket;

                    $scope.next = function () {
                        Ticket.discount_voucher_code = $scope.ticket.discount_voucher_code;
                        TicketServ.update({id: Ticket.id}, Ticket);

                        MailServ.save({'ticket_id': Ticket.id}, function (mail) {
                            console.log(mail);
                        });

                        $state.go('ticket.all-done');
                    }
                },
                resolve: {
                    'Ticket': function (TicketServ, $state, $stateParams) {
                        return TicketServ.get({id: $stateParams.id});
                    },
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );

        $stateProvider.state('ticket.all-done',
            {
                url: '/done',
                templateUrl: 'partials/ticket/done.html',
                controller: function ($scope) {
                },
                resolve: {
                    'hasHistory': function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }
                }
            }
        );

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

app.run(function ($http, $rootScope, CSRF_TOKEN, PreloadTemplates) {
    PreloadTemplates.run();
    $rootScope.CSRF_TOKEN = CSRF_TOKEN;
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
});


