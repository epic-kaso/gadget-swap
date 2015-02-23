/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module("AdminApp",
    ['ui.select', 'ngSanitize',
        'ui.bootstrap', 'ui.router',
        'ngAnimate', 'ngResource',
        'angular-loading-bar', 'adminApp.directives', 'adminApp.controllers',
        'adminApp.services', 'ngCookies']);

app.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state('devices',
            {
                url: '/devices',
                abstract: true,
                templateUrl: 'partials/device_models/dashboard.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'devices';
                    }]
                }
            }
        );

        $stateProvider.state('devices.search',
            {
                url: '/search?q',
                templateUrl: 'partials/device_models/search.html',
                controller: ['$scope', 'result', '$stateParams', function ($scope, result, $stateParams) {
                    console.log(result);
                    $scope.result = result;
                    $scope.search = $stateParams.q;
                }],
                resolve: {
                    'result': ['$stateParams', 'DevicesServ', function ($stateParams, DevicesServ) {
                        return DevicesServ.query({q: $stateParams.q});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('devices.menu',
            {
                url: '/menu',
                templateUrl: 'partials/device_models/menu.html',
                controller: function () {
                },
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }]
                }
            }
        );

        $stateProvider.state('devices.add',
            {
                url: '/add',
                templateUrl: 'partials/device_models/add.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'DeviceBrands': ['DeviceBrandsServ', function (DeviceBrandsServ) {
                        return DeviceBrandsServ.query({only: true});
                    }]
                },
                controller: ['$scope', 'ImageFetcher', 'DeviceBrands', function ($scope, ImageFetcher, DeviceBrands) {

                    $scope.models = DeviceBrands;

                    $scope.sizes = [];
                    $scope.sizes_string = '';
                    $scope.baseLinePrice = {};
                    $scope.baseLinePriceString = '';
                    $scope.images = [];

                    $scope.fetchImages = function (name) {
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function (images) {
                            $scope.images = images;
                        });
                    };

                    function createStringVersion() {
                        $scope.sizes_string = $scope.sizes.join();
                    }

                    $scope.addToSizes = function (device_size) {
                        $scope.sizes.push(device_size);
                        $scope.device_size = null;
                        createStringVersion();
                    };

                    $scope.removeSize = function (index) {
                        $scope.sizes.splice(index, 1);
                        createStringVersion();
                    };

                    $scope.updateBaseLineString = function () {
                        var temp = [];
                        angular.forEach($scope.baseLinePrice, function (value, key) {
                            temp.push("" + key + ": " + value);
                        });
                        $scope.baseLinePriceString = temp.join();
                    }
                }]
            }
        );

        $stateProvider.state('devices.list',
            {
                url: '/list',
                templateUrl: 'partials/device_models/list.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Devices': ['DevicesServ', function (DevicesServ) {
                        return DevicesServ.query({});
                    }]
                },
                controller: ['$scope', 'DevicesServ', 'Devices', function ($scope, DevicesServ, Devices) {
                    $scope.models = Devices;
                    $scope.deleteItem = function (id) {
                        DevicesServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }]
            }
        );


        $stateProvider.state('device_brands',
            {
                url: '/device_brands',
                abstract: true,
                templateUrl: 'partials/device_brands/dashboard.html',
                controller: function () {

                }
                ,
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'device_brands';
                    }]
                }
            }
        );

        $stateProvider.state('device_brands.search',
            {
                url: '/search?q',
                templateUrl: 'partials/device_brands/search.html',
                controller: ['$scope', 'result', '$stateParams', function ($scope, result, $stateParams) {
                    console.log(result);
                    $scope.result = result;
                    $scope.search = $stateParams.q;
                }],
                resolve: {
                    'result': ['$stateParams', 'DeviceBrandsServ', function ($stateParams, DeviceBrandsServ) {
                        return DeviceBrandsServ.query({q: $stateParams.q});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('device_brands.menu',
            {
                url: '/menu',
                templateUrl: 'partials/device_brands/menu.html',
                controller: function () {
                },
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }]
                }
            }
        );

        $stateProvider.state('device_brands.add',
            {
                url: '/add',
                templateUrl: 'partials/device_brands/add.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                },
                controller: ['$scope', 'ImageFetcher', function ($scope, ImageFetcher) {

                    $scope.fetchImages = function (name) {
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function (images) {
                            $scope.images = images;
                        });
                    };
                }]
            }
        );

        $stateProvider.state('device_brands.list',
            {
                url: '/list',
                templateUrl: 'partials/device_brands/list.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'DeviceBrands': ['DeviceBrandsServ', function (DeviceBrandsServ) {
                        return DeviceBrandsServ.query({only: true});
                    }]
                },
                controller: ['$scope', 'DeviceBrandsServ', 'DeviceBrands', function ($scope, DeviceBrandsServ, DeviceBrands) {
                    $scope.brands = DeviceBrands;
                    $scope.deleteItem = function (id) {
                        DeviceBrandsServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }]
            }
        );

        $stateProvider.state('networks',
            {
                url: '/networks',
                abstract: true,
                templateUrl: 'partials/networks/dashboard.html',
                controller: function () {
                    //$state.go('networks.menu');
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'networks';
                    }]
                }
            }
        );

        $stateProvider.state('networks.search',
            {
                url: '/search?q',
                templateUrl: 'partials/networks/search.html',
                controller: ['$scope', 'result', '$stateParams', function ($scope, result, $stateParams) {
                    console.log(result);
                    $scope.result = result;
                    $scope.search = $stateParams.q;
                }],
                resolve: {
                    'result': ['$stateParams', 'NetworksServ', function ($stateParams, NetworksServ) {
                        return NetworksServ.query({q: $stateParams.q});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('networks.menu',
            {
                url: '/menu',
                templateUrl: 'partials/networks/menu.html',
                controller: function () {
                },
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }]
                }
            }
        );

        $stateProvider.state('networks.add',
            {
                url: '/add',
                templateUrl: 'partials/networks/add.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                },
                controller: ['$scope', 'ImageFetcher', function ($scope, ImageFetcher) {

                    $scope.fetchImages = function (name) {
                        var promise = ImageFetcher.fetch(name);
                        promise.then(function (images) {
                            $scope.images = images;
                        });
                    };
                }]
            }
        );

        $stateProvider.state('networks.list',
            {
                url: '/list',
                templateUrl: 'partials/networks/list.html',
                resolve: {
                    'Networks': ['NetworksServ', function (NetworksServ) {
                        return NetworksServ.query({});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                },
                controller: ['$scope', 'Networks', 'NetworksServ', function ($scope, Networks, NetworksServ) {
                    $scope.networks = Networks;
                    $scope.deleteItem = function (id) {
                        NetworksServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }]
            }
        );


        $stateProvider.state('advisers',
            {
                url: '/advisers',
                abstract: true,
                templateUrl: 'partials/advisers/dashboard.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'advisers';
                    }]
                }
            }
        );

        $stateProvider.state('advisers.menu',
            {
                url: '/menu',
                templateUrl: 'partials/advisers/menu.html',
                controller: ['$scope', 'advisers', function ($scope, advisers) {
                    $scope.advisers = advisers;
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'advisers': ['AdvisersServ', function (AdvisersServ) {
                        return AdvisersServ.query({limit: 6});
                    }]
                }
            }
        );

        $stateProvider.state('advisers.list',
            {
                url: '/list',
                templateUrl: 'partials/advisers/list.html',
                controller: ['$scope', 'advisers', 'AdvisersServ', function ($scope, advisers, AdvisersServ) {
                    $scope.advisers = advisers;

                    $scope.deleteItem = function (id) {
                        AdvisersServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'advisers': ['AdvisersServ', function (AdvisersServ) {
                        return AdvisersServ.query();
                    }]
                }
            }
        );

        $stateProvider.state('advisers.add',
            {
                url: '/add',
                templateUrl: 'partials/advisers/add/add.html',
                controller: ['$scope', 'AdvisersServ', '$state', function ($scope, AdvisersServ, $state) {
                    $scope.createAdviser = function (adviser) {
                        AdvisersServ.save(adviser, function (adviser) {
                            console.log(adviser);
                            $state.go('advisers.list');
                        }, function (error) {
                            alert("Ensure values are all filled correctly");
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );


        $stateProvider.state('ticket',
            {
                url: '/ticket',
                abstract: true,
                templateUrl: 'partials/ticket/dashboard.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'ticket';
                    }]
                }
            }
        );

        $stateProvider.state('ticket.menu',
            {
                url: '/menu',
                templateUrl: 'partials/ticket/menu.html',
                controller: ['$scope', 'Tickets', function ($scope, Tickets) {
                    $scope.tickets = Tickets;
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = false;
                    }],
                    'Tickets': ['TicketServ', function (TicketServ) {
                        return TicketServ.query({limit: 6});
                    }]
                }
            }
        );

        $stateProvider.state('ticket.list',
            {
                url: '/list',
                templateUrl: 'partials/ticket/list.html',
                controller: ['$scope', 'Tickets', 'TicketServ', function ($scope, Tickets, TicketServ) {
                    $scope.tickets = Tickets;

                    $scope.deleteItem = function (id) {
                        TicketServ.delete({id: id}, function (response) {
                            location.reload();
                        }, function (response) {
                            alert(response);
                        });
                    }
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Tickets': ['TicketServ', function (TicketServ) {
                        return TicketServ.query();
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add',
            {
                url: '/add',
                templateUrl: 'partials/ticket/add/base.html',
                controller: 'NewTicketController',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepOne',
            {
                url: '/step-one',
                templateUrl: 'partials/ticket/add/step-one.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepTwo',
            {
                url: '/step-two',
                templateUrl: 'partials/ticket/add/step-two.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.stepThree',
            {
                url: '/step-three',
                templateUrl: 'partials/ticket/add/step-three.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.add.final',
            {
                url: '/final',
                templateUrl: 'partials/ticket/add/final.html',
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.evaluate', {
            url: '/evaluate/{id}',
            templateUrl: 'partials/ticket/evaluation/evaluation.html',
            controller: ['$scope', '$stateParams', '$filter', ' Networks', 'Ticket', 'TicketServ', 'DeviceBrandsServ', 'GadgetEvaluationReward', '$state',
                function ($scope, $stateParams, $filter, Networks, Ticket, TicketServ, DeviceBrandsServ, GadgetEvaluationReward, $state) {

                    if (typeof $stateParams.id == "undefined")
                        $state.go('ticket.add.stepOne');

                    $scope.ticket = Ticket;

                    $scope.selected = {grade: Ticket.device_grade};

                    $scope.networks = Networks;

                    $scope.brand = {};

                    $scope.refreshBrands = function (brand) {
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
                    };

                    function updateTicket(selected, reward) {
                        Ticket.gadget_id = selected.device.id;
                        Ticket.size_id = selected.size;
                        Ticket.network_id = selected.network;
                        Ticket.reward = reward;

                        TicketServ.update({id: Ticket.id}, Ticket);
                    }

                }],
            resolve: {
                'hasHistory': ['$rootScope', function ($rootScope) {
                    $rootScope.hasHistory = true;
                }],
                'Ticket': ['TicketServ', '$state', '$stateParams', function (TicketServ, $state, $stateParams) {
                    return TicketServ.get({id: $stateParams.id});
                }],
                'Networks': ['NetworksServ', function (NetworksServ) {
                    return NetworksServ.query({});
                }]
            }
        });

        $stateProvider.state('ticket.reward',
            {
                url: '/reward/{id}',
                templateUrl: 'partials/ticket/evaluation/reward.html',
                controller: ['$scope', '$stateParams', 'Ticket', 'TicketServ', 'GadgetEvaluationReward', 'Airtel', '$state',
                    function ($scope, $stateParams, Ticket, TicketServ, GadgetEvaluationReward, Airtel, $state) {

                        if (typeof $stateParams.id == "undefined")
                            $state.go('ticket.add.stepOne');

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
                    }],
                resolve: {
                    'Airtel': ['GadgetEvaluationReward', function (GadgetEvaluationReward) {
                        return GadgetEvaluationReward.fetchAirtelBonus();
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }],
                    'Ticket': ['TicketServ', '$state', '$stateParams', function (TicketServ, $state, $stateParams) {
                        return TicketServ.get({id: $stateParams.id});
                    }]
                }
            }
        );

        $stateProvider.state('ticket.accept-terms',
            {
                url: '/accept-terms/{id}',
                templateUrl: 'partials/ticket/evaluation/terms.html',
                controller: ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
                    if (typeof $stateParams.id == "undefined")
                        $state.go('ticket.add.stepOne');

                    $scope.next = function () {
                        $state.go('ticket.review-ticket', {id: $stateParams.id});
                    };
                }],
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );


        $stateProvider.state('ticket.review-ticket',
            {
                url: '/review/{id}',
                templateUrl: 'partials/ticket/evaluation/review.html',
                controller: ['$scope', '$stateParams', 'Ticket', 'TicketServ', '$state', 'MailServ',
                    function ($scope, $stateParams, Ticket, TicketServ, $state, MailServ) {

                        if (typeof $stateParams.id == "undefined")
                            $state.go('ticket.add.stepOne');

                        $scope.ticket = Ticket;

                        $scope.next = function () {
                            Ticket.discount_voucher_code = $scope.ticket.discount_voucher_code;
                            TicketServ.update({id: Ticket.id}, Ticket);

                            MailServ.save({'ticket_id': Ticket.id}, function (mail) {
                                console.log(mail);
                            });

                            $state.go('ticket.all-done');
                        }
                    }],
                resolve: {
                    'Ticket': ['TicketServ', '$state', '$stateParams',
                        function (TicketServ, $state, $stateParams) {
                            return TicketServ.get({id: $stateParams.id});
                        }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.all-done',
            {
                url: '/done',
                templateUrl: 'partials/ticket/done.html',
                controller: function () {
                },
                resolve: {
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('ticket.search',
            {
                url: '/search?q',
                templateUrl: 'partials/ticket/search.html',
                controller: ['$scope', 'result', '$stateParams', function ($scope, result, $stateParams) {
                    console.log(result);
                    $scope.result = result;
                    $scope.search = $stateParams.q;
                }],
                resolve: {
                    'result': ['$stateParams', 'TicketServ', function ($stateParams, TicketServ) {
                        return TicketServ.query({q: $stateParams.q});
                    }],
                    'hasHistory': ['$rootScope', function ($rootScope) {
                        $rootScope.hasHistory = true;
                    }]
                }
            }
        );

        $stateProvider.state('config',
            {
                url: '/config',
                templateUrl: 'partials/config/form.html',
                controller: function () {
                },
                resolve: {
                    'active': ['$rootScope', function ($rootScope) {
                        $rootScope.active_nav = 'config';
                    }]
                }
            }
        );


        $urlRouterProvider.otherwise('/ticket/menu');
    }]);

app.factory('sessionInjector', ['$location', function ($location) {
    return {
        request: function (config) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            console.log('Header modified');
            return config;
        },
        responseError: function (response) {
            if (response.status == 401) {
                location.href = '/auth/login';
                return response;
            }
            return response;
        },
        response: function (response) {
            if (response.status == 401) {
                location.href = '/auth/login';
                return response;
            }
            return response;
        }
    };
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

app.run(['$http', '$rootScope', 'CSRF_TOKEN', 'PreloadTemplates',
    function ($http, $rootScope, CSRF_TOKEN, PreloadTemplates) {
        PreloadTemplates.run();
        $rootScope.CSRF_TOKEN = CSRF_TOKEN;
        $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
    }]);



/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope', 'TicketServ', '$state', '$stateParams', 'GradeDeviceServ',
    function ($scope, TicketServ, $state, $stateParams, GradeDeviceServ) {
        $scope.activeStep = 'stepOne';
        $scope.ticket = {
            test: {
                deviceBoot: '',
                callUnlock: '',
                wirelessConnection: '',
                icloudConnection: ''
            },
            gradingSystem: {
                touchScreen: {rating: '', weight: 0.625},
                lcdScreen: {rating: '', weight: 0.625},
                deviceCasing: {rating: '', weight: 0.625},
                deviceKeypad: {rating: '', weight: 0.25},
                deviceCamera: {rating: '', weight: 0.25},
                deviceEarPiece: {rating: '', weight: 0.125},
                deviceSpeaker: {rating: '', weight: 0.125},
                deviceEarphoneJack: {rating: '', weight: 0.125},
                deviceChargingPort: {rating: '', weight: 0.25}
            }
        };

        $scope.activeNextButton = false;



        $scope.$watch('ticket.test', function (newV, oldV) {
            console.log('test change');
            console.log(newV);

            var ready = checkTestsPassed(newV);
            setViewState(ready);

        }, true);


        $scope.$watch('ticket.gradingSystem', function (newV, oldV) {
            console.log('gradingSystem change');
            console.log(newV);
            $scope.ticket.grade = GradeDeviceServ.getGrade(newV);
            console.log('Grade:' + $scope.ticket.grade);
        }, true);

        $scope.createTicket = function (ticket) {
            TicketServ.save(ticket, function (ticket) {
                if (typeof ticket.id != "undefined") {
                    $scope.ticket = ticket;
                    $state.isCreatingTicket = false;
                }
            }, function (ticket) {
                alert("failed");
                console.log(ticket);
                $state.isCreatingTicket = false;
                $state.creationError = true;
            });
        };


        $scope.nextStepTwo   = function() {
            $scope.activeStep = 'stepTwo';
            $state.go('ticket.add.stepTwo');
        };

        $scope.nextStepThree = function () {
            $scope.activeStep = 'stepThree';
            $state.go('ticket.add.stepThree');
        };

        $scope.nextStepFinal = function () {
            $scope.activeStep = 'stepFinal';
            $state.go('ticket.add.final');
            $state.isCreatingTicket  = true;
            $scope.createTicket($scope.ticket);
        };

       //grade

        $scope.nextStepEvaluation = function () {
            $state.go('ticket.evaluate', {'id': $scope.ticket.id });
        };

        function checkTestsPassed(obj) {
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
    }]);
/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.directives',[]);

app.directive('backButton',function(){
    return {
        'restrict': 'EA',
        'template': '<a class="btn base-resize search-btn back-btn" href=""><span class="fa fa-chevron-left"></span></a>',
        'link': function link(scope, element, attrs) {
            element.bind('click',function(e){
                window.history.back();
                e.preventDefault();
            })
        }
    }
});


/**
 * Created by Ak on 2/19/2015.
 */



/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.services',[]);

app.factory('TicketServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/ticket/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('DeviceBrandsServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/device_makers/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('AdvisersServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/advisers/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);

app.factory('DevicesServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/devices/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);


app.factory('MailServ', ['$resource', function ($resource) {
    return $resource('/resources/mail', null);//URLServ.getResourceUrlFor("ticket"));
}]);


app.factory('NetworksServ', ['$resource', 'URLServ', function ($resource, URLServ) {
    return $resource('/resources/networks/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });//URLServ.getResourceUrlFor("ticket"));
}]);


app.factory('URLServ', ['$rootScope', function ($rootScope) {
    return {
        "getResourceUrlFor": function(name){
            return $rootScope.data.resources[name];
        }
    }
}]);

app.factory('GadgetEvaluationReward', ['NetworksServ', '$cookieStore', function (NetworksServ, $cookieStore) {
    var reward = {result: ''};

    function getBaseLinePrice(device, size) {
        var baseLinePrice = 0;

        console.log('Device --reward');
        console.log(device);
        angular.forEach(device.base_line_prices, function (v, k) {
            if (v.id == size) {
                    baseLinePrice = parseInt(v.value);
                }
        });

        return baseLinePrice;
    }

    function calculatePriceFromGrade(device, grade, baseLinePrice) {
        console.log(baseLinePrice);
        console.log(device.brand.normal_condition);
        console.log(device.brand);
        console.log(grade);

        switch (grade) {
            case 'A':
                return parseFloat(parseInt(device.brand.normal_condition) / 100.0) * baseLinePrice;
            case 'B':
                return parseFloat(parseInt(device.brand.scratched_condition) / 100.0) * baseLinePrice;
            case 'C':
                return parseFloat(parseInt(device.brand.bad_condition) / 100.0) * baseLinePrice;
        }
    }

    return {
        "calculate": function (model) {
            reward.result = calculatePriceFromGrade(model, model.grade, getBaseLinePrice(model.device, model.size));
            console.log(reward.result);

            $cookieStore.put('last-reward', reward.result);
            return reward.result;
        },
        "getLastReward": function () {
            return $cookieStore.get('last-reward');
        },
        fetchAirtelBonus: function () {
            var network = NetworksServ.get({q: 'airtel'});
            return network;
        }
    }
}]);

app.factory('GradeDeviceServ', ['$rootScope', function ($rootScope) {

    var threshold = {
        'A': 8.1,
        'B': 5.85
    };

    function generateGradePoint(device) {
        var result = {gradePoint: 0};

        angular.forEach(device, function (value, key) {
            if (value.rating != '') {
                this.gradePoint += parseInt(value.rating) * value.weight;
            }
        }, result);

        return result.gradePoint;
    }

    function generateGradeLetter(gradePoint) {
        var value = parseFloat(gradePoint);

        if (value >= threshold.A) {
            return 'A';
        } else if (value >= threshold.B) {
            return 'B';
        } else {
            return 'C';
        }
    }

    return {
        "getGrade": function (device) {
            var gradePoint = generateGradePoint(device);
            return generateGradeLetter(gradePoint);
        }
    }
}]);

app.factory('PreloadTemplates', ['$templateCache', '$http','PRELOAD_UI_LIST', function ($templateCache, $http,PRELOAD_UI_LIST) {
    var templates = PRELOAD_UI_LIST.get();
    return {
        run: function () {
            templates.forEach(function (currentItem) {
                $http.get(currentItem, {cache: $templateCache});
            });
        }
    }
}]);


app.factory('ImageFetcher', ['$http', '$q', function ($http, $q) {
    var searchUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAJ_8QtWECvWTcrukqvfLmRWdARJ2bI2rk&cx=011505858740112002603:dap5yb7naau&q=";

    return {
        fetch: function (query) {
            var images = [];
            var deferred = $q.defer();
            $http.get(searchUrl + encodeURI(query)).then(function (response) {
                console.log(response.data);
                response.data.items.forEach(function (currentValue) {
                    if (angular.isDefined(currentValue.pagemap)) {
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
            }, function (response) {
                console.log(response);
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

}]);