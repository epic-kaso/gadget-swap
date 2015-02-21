/**
 * Created by kaso on 11/6/2014.
 */

var app = angular.module('SupergeeksWidget',
    [
        'ui.router',
        'ui.checkbox',
        'ui.bootstrap',
        'ngCookies',
        'ngAnimate',
        'ngSanitize',
        'SupergeeksWidget.Controllers',
        'SupergeeksWidget.Services',
        'SupergeeksWidget.directives'
    ]);

app.run(function ($rootScope, CurrentGadget,GadgetsInfoServ,$location,PreloadTemplates) {
    GadgetsInfoServ.get();
    PreloadTemplates.run();
    $rootScope.app_data = window.gadget_swap;
    $rootScope.currentGadget = CurrentGadget.fetch();
    $rootScope.updateAndGetCurrentModel = function($stateParams,$rootScope,GadgetsInfoServ){
        //:device_make/:device_model/:device_size/:device_network/:device_condition
        angular.forEach($stateParams,function(value,key){
            switch (key){
                case 'device_make':
                    if(!$rootScope.currentGadget.make) {
                        $rootScope.currentGadget.make = value;
                        $rootScope.currentGadget.current_make = GadgetsInfoServ.getMakeByName(value);
                    }
                    break;
                case 'device_model':
                    if(!$rootScope.currentGadget.model)
                        $rootScope.currentGadget.model = GadgetsInfoServ.getModelBySlug(value);
                    break;
                case 'device_size':
                    if(!$rootScope.currentGadget.size)
                        $rootScope.currentGadget.size = GadgetsInfoServ.getSizeModelBySlug(value,$rootScope.currentGadget.model);
                    break;
                case 'device_network':
                    if(!$rootScope.currentGadget.network)
                        $rootScope.currentGadget.network = GadgetsInfoServ.getNetworkBySlug(value);
                    break;
                case 'device-reward':
                case 'device_condition':
                    var conditions = GadgetsInfoServ.getConditions();
                    if(!$rootScope.currentGadget.condition)
                        $rootScope.currentGadget.condition = value;
                    for(var i = 0;i < conditions.length;i++){
                        if(conditions[i].slug == value) {
                            $rootScope.currentGadget.condition_value = conditions[i].value;
                            break;
                        }
                    }
                    break;

            }
        });
    };

    $rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
        $rootScope.updateAndGetCurrentModel(toParams,$rootScope,GadgetsInfoServ);
    });

    $rootScope.$on('$stateNotFound',function(){
        $location.path('/devices');
    })
});

app.constant('ViewBaseURL','/app/partials');

app.config(function ($stateProvider, $urlRouterProvider,ViewBaseURL) {
    $urlRouterProvider.when(
        '/devices/:device_make/:device_model/:device_size/:device_network/:device_condition',
        '/devices/:device_make/:device_model/:device_size/:device_network/:device_condition/reward'
    );

    $urlRouterProvider.otherwise("/devices");

    var deviceMake = {
        name: 'device-make',
        url: "/devices",
        templateUrl: ViewBaseURL+"/device-make.html",
        controller: "DeviceMakeController",
        resolve: {
            'Makes': function (GadgetsInfoServ) {
                return GadgetsInfoServ.get();
            }
        }
    };

    var deviceModel = {
        name: 'device-model',
        url: "/devices/:device_make",
        templateUrl: ViewBaseURL+"/device-model.html",
        controller: 'DeviceModelController',
        resolve: {
            'Models': function($state,$stateParams,GadgetsInfoServ){
                var p = $stateParams.device_make;
                return GadgetsInfoServ.getModelsFor(p);
            },
            'CurrentMake': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getMakeByName($stateParams.device_make);
            }
        }
    };


    var deviceSize = {
        name: 'device-size',
        url: "/devices/:device_make/:device_model",
        templateUrl: ViewBaseURL+"/device-size.html",
        controller: 'DeviceSizeController',
        resolve: {
            'CurrentModel': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getModelByName($stateParams.device_model);
            }
        }
    };

    var deviceNetwork = {
        name: 'device-network',
        url: "/devices/:device_make/:device_model/:device_size",
        templateUrl: ViewBaseURL+"/device-network.html",
        controller: 'DeviceNetworkController',
        resolve: {
            'CurrentModel': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getModelByName($stateParams.device_model);
            },
            'Networks': function ($rootScope,GadgetsInfoServ) {
                return GadgetsInfoServ.getNetworks();
            }
        }
    };

    var deviceCondition = {
        name: 'device-condition',
        url: "/devices/:device_make/:device_model/:device_size/:device_network",
        templateUrl: ViewBaseURL+"/device-condition.html",
        controller: 'DeviceConditionController',
        resolve: {
            'CurrentModel': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getModelByName($stateParams.device_model);
            }
        }
    };

    var parentReward = {
      name: 'parentReward',
      abstract: true,
      template: '<div class="widget-canvas"><div ui-view class="animated reward"></div> </div>',
      url: "/devices/:device_make/:device_model/:device_size/:device_network/:device_condition"
    };
    var deviceReward = {
        parent: 'parentReward',
        name: 'device-reward',
        url: "/reward",
        templateUrl: ViewBaseURL+"/device-reward.html",
        controller: 'DeviceRewardController',
        resolve: {
            'CurrentModel': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getModelByName($stateParams.device_model);
            }
        }
    };

    var deviceSwapLocation = {
        parent: 'parentReward',
        name: 'swapLocation',
        url: "/swap-location",
        templateUrl: ViewBaseURL+"/swap-location.html",
        controller: 'DeviceRewardController',
        resolve: {
            'CurrentModel': function($stateParams,GadgetsInfoServ){
                return GadgetsInfoServ.getModelByName($stateParams.device_model);
            }
        }
    };

    var bookAppointment = {
        name: 'book-appointment',
        url: "/book-appointment/:swap_center",
        templateUrl: ViewBaseURL+"/book-appointment.html",
        controller: 'BookAppointmentController'
    };

    var success = {
        name: 'success',
        url: "/successful-booking",
        templateUrl: ViewBaseURL+"/book-success.html",
        controller: function ($scope) {

        }
    };

    $stateProvider
        .state(deviceMake)
        .state(deviceModel)
        .state(deviceSize)
        .state(deviceNetwork)
        .state(deviceCondition)
        .state(parentReward)
        .state(deviceReward)
        .state(deviceSwapLocation)
        .state(bookAppointment)
        .state(success);
});
/**
 * Created by kaso on 11/6/2014.
 */
var app = angular.module('SupergeeksWidget.Services', [])

/**
 * Created by kaso on 12/19/2014.
 */

var Gadget = function(props){
    //this.make = props.make || '';
    //this.model = props.model || '';
    //this.color = props.color || '';
    //this.size = props.size || '';
    //this.baseLinePrice = props.baseLinePrice || 0;
    //this.condition = '';
    //this.network = '';
};

Gadget.prototype.getValue = function(){
    var result = this.condition * this.baseLinePrice,
        bonus =  result * (this.getNetworkBonus()/100.0);

    return result + bonus;
};

Gadget.prototype.getNetworkBonus = function(){
    if(this.network)
        return this.network.description;
    return 'none';
};

Gadget.prototype.getReward = function(){
    if(this.size && this.baseLinePrice && this.condition_value)
        return parseInt(parseInt(this.baseLinePrice) * (this.condition_value/ 100.0));
    return 'Sorry, You\'ll have to come to our Swap Location.';
};





app.factory('GadgetServ', function () {
    var models = {};
    var devices = {};

    return {
        getModels: function () {
            return models;
        },
        setModels: function(data){
            models = data;
        },
        setDevices: function(data){
            angular.forEach(data,function(value,key){
                devices[value.name] =  value.gadgets;
            },devices);
            console.log(devices);
        },
        getDevicesFor: function(make){
            return devices[make];
        }
    };
});

app.factory('MailServ', function ($http) {
    var url = 'https://mandrillapp.com/api/1.0/messages/send.json';
    var data = {
        "message": {
            "html": "",
            "text": "",
            "subject": "Supergeeks Widget",
            "from_email": "supergeeks-widget@supergeeks.com.ng",
            "from_name": "Supergeeks Widget",
            "to": [
            ],
            "headers": {"Reply-To": "no-reply@supergeeks.com.ng"},
            "important": true
        },
        "key": "XZ6K0JEmpINZY4sw6_1F2g"
    };

    return {
        send: function(message,destination){
            data.message.html = message;
            data.message.to.push({email: destination,type: 'to' });
            return $http.post(url,data);
        }
    }
});

app.factory('CurrentGadget',function(){
    var gadget = new Gadget({});
    return {
        fetch: function(){
            return gadget;
        }
    }
});

app.factory('GadgetsInfoServ',function($http,GadgetServ,$q,$rootScope){
    var cache;
    var networks = [
        {
            name: 'Airtel',
            image_url: 'airtel.jpg'
        },
        {
            name: 'Mtn',
            image_url: 'mtn.jpg'
        },
        {
            name: 'Glo',
            image_url: 'glo.jpg'
        },
        {
            name: 'Etisalat',
            image_url: 'etisalat.jpg'
        }
    ];
    return {
        'get': function(){
            var p = $q.defer();
            if(cache){
                p.resolve(cache);
            }else{

                GadgetServ.setModels(window.gadget_swap.data.models);
                GadgetServ.setDevices(window.gadget_swap.data.models);
                cache = window.gadget_swap.data;
                networks = window.gadget_swap.data.networks;
                p.resolve(window.gadget_swap.data);
            }
            return p.promise;
        },
        'getModelsFor': function(maker){
           return  GadgetServ.getDevicesFor(maker);
        },
        getMakeByName: function(device_make){
            var result = {data: ''};
            angular.forEach(cache.models,function(value,key){
                if(value['name'] == device_make) {
                    this.data = value;
                    return value;
                }

            },result);

            return result.data;
        },
        getModelByName: function(device_model){
            var result = {data: ''};
            angular.forEach(cache.devices,function(v,k){
                if(v['model'] == device_model)
                    this.data = v;
                    return v;
            },result);
            return result.data;
        },
        getModelBySlug: function(device_model){
            var result = {data: ''};
            angular.forEach(cache.devices,function(v,k){
                if(v['slug'] == device_model)
                    this.data = v;
                return v;
            },result);
            return result.data;
        },
        getSizeModelBySlug: function(input,model){
            var result = {data: ''};
            angular.forEach(model.sizes,function(v,k){
                if(v['slug'] == input)
                    this.data = v;
                return v;
            },result);
            return result.data;
        },
        getNetworks: function(){
            console.log(networks);
            return networks;
        },
        getBaseLinePriceForSize: function(model,size){
            var result = {data: ''};
            angular.forEach(model.base_line_prices,function(v,k){
                if(v['size'] == size)
                    this.data = v['value'];
                return v['value'];
            },result);
            return result.data;
        },
        getNetworkBySlug: function(name){
            for(var i = 0;i < networks.length; i++){
                if(networks[i].slug == name)
                    return networks[i];
            }
            return {};
        },
        getConditions: function(){
            return  [
                {
                    name: 'Like New',
                    slug: 'Like-New',
                    value: $rootScope.currentGadget.current_make.normal_condition
                },
                {
                    name: 'Scratches & Cracks',
                    slug: 'Scratches-Cracks',
                    value: $rootScope.currentGadget.current_make.scratched_condition
                },
                {
                    name: 'Faulty',
                    slug: 'Faulty',
                    value: $rootScope.currentGadget.current_make.bad_condition
                }
            ];
        },
        postSwapDetails: function(details){
            var url = window.location.origin + "/add-swap-detail";
            return $http.post(url,details);
        }

    }
});

app.factory('PreloadTemplates',function ($templateCache, $http,ViewBaseURL) {
    var templates = [
        ViewBaseURL+"/device-make.html",
        ViewBaseURL+"/device-model.html",
        ViewBaseURL+"/device-size.html",
        ViewBaseURL+"/device-network.html",
        ViewBaseURL+"/device-condition.html",
        ViewBaseURL+"/device-reward.html",
        ViewBaseURL+"/book-appointment.html",
        ViewBaseURL+"/book-success.html",
        ViewBaseURL+"/swap-location.html"
    ];
    return {
        run: function(){
            templates.forEach(function(currentItem){
                $http.get(currentItem, { cache: $templateCache });
            });
        }
    }
});
/**
 * Created by kaso on 11/6/2014.
 */

var app = angular.module('SupergeeksWidget.directives',[]);

app.directive('progressBar',function(){
   return {
       'restrict': 'EA',
       'scope': {
           'val': '='
       },
       'link': function(scope,elem,attrs){
           elem.css('width','0');
           scope.$watch('val',function(newv,oldv){
               console.log('val changed');
               elem.css('width',newv);
           })
       }

   }
});


app.directive('conditionSelect',function(){
    return {
        'restrict': 'EA',
        'scope': {
            'val': '='
        },
        'link': function(scope,elem,attrs){
            scope.$watch('val',function(newv,oldv){
                if(newv == true){
                    elem.css('border','#e8e8e8 solid 1px');
                }else{
                    elem.css('border','none');
                }
            })
        }
    }
});

app.directive('previousButton',function($window){
   return {
       restrict: 'EA',
       link: function(scope, element, attrs) {
           element.on('click', function() {
               $window.history.back();
           });
       }
   };
});

app.directive('ensureValid',function(){
   return {
       'restrict': 'EA',
       'link': function(scope,elem,attrs){
           elem.on('click',function(){
               $state.transitionTo(TimeLine.prev());
           })
       }
   };
});
/**
 * Created by kaso on 11/6/2014.
 */

var app = angular.module('SupergeeksWidget.Controllers', []);

app.controller('NavbarController', [
    '$scope','$rootScope', function ($scope,$rootScope) {

        $rootScope.$on('progress-update-event', function (event, val) {
            console.log('Progress Update Event Received');
            $scope.progress = val;
        });
    }
]);

app.controller('DeviceMakeController', function ($scope,Makes,$rootScope,$sce) {
    $rootScope.tiny_heading = $sce.trustAsHtml('Get <span style="font-size: 30px;color: green;">₦</span> value of your Gadget, Swap Now.');
    $rootScope.big_heading = 'First, Select your Gadget Make';
    $rootScope.device_make = 'others';

    $scope.makes = Makes;
    console.log(Makes);
    $scope.$emit('progress-update-event', '10%');

});

app.controller('DeviceModelController',
    function (CurrentMake,Models,$scope, $stateParams, $cookieStore, GadgetServ, $state,$rootScope) {

        console.log(Models);

        $rootScope.big_heading = 'Next, Select your Model';
        $scope.$emit('progress-update-event', '20%');

        $scope.currentGadget.make = $stateParams.device_make;
        $scope.currentGadget.current_make = CurrentMake;

        $scope.image_label = $scope.currentGadget.make;
        $scope.image_url = CurrentMake.logo_url || 'smartphone.png';

        $scope.models = Models;

        $scope.selectModel = function ($event,model, state) {
            $scope.currentGadget.model = model;
            $scope.currentGadget.image_url = $scope.currentGadget.model.image_url || '/Assets/img/smartphone.png';
            $state.go(state,
                {
                    device_make: $stateParams.device_make,
                    device_model: model.slug
                });
            console.log($event);
            $event.preventDefault();
        }
    });

app.controller('DeviceSizeController',
    function ($scope, $stateParams, $cookieStore, GadgetServ, $state,$rootScope,GadgetsInfoServ) {
        $rootScope.big_heading = 'Ok Now, Select your Storage Size';

        $scope.$emit('progress-update-event', '54%');

        $scope.device_class = $rootScope.device_make = 'others';
        $scope.image_label = $scope.currentGadget.make +' '+
                             $scope.currentGadget.model.model;
        $scope.image_url = $scope.currentGadget.model.image_url || '/Assets/img/smartphone.png';

        $scope.sizes = $scope.currentGadget.model.sizes;

        $scope.selectSize = function ($event,size, state) {
            $scope.currentGadget.size = size;
            $scope.currentGadget.baseLinePrice = GadgetsInfoServ.getBaseLinePriceForSize($scope.currentGadget.model,size.value);
            $state.go(state,
                {
                    device_make: $stateParams.device_make,
                    device_model: $stateParams.device_model,
                    device_size: size.value
                }
            );
            $event.preventDefault();
        }
    });


app.controller('DeviceNetworkController',
    function (Networks, $scope, $stateParams, $cookieStore, GadgetServ, $state,$rootScope) {
        $rootScope.big_heading = 'Please, Select your Network Provider';

        $scope.$emit('progress-update-event', '65%');

        $scope.device_class = $rootScope.device_make = 'others';
        $scope.image_label = $scope.currentGadget.make +' '+
        $scope.currentGadget.model.model;
        $scope.image_url = $scope.currentGadget.model.image_url || '/Assets/img/smartphone.png';
        $scope.networks = Networks;

        $scope.selectNetwork = function ($event, network, state) {
            $scope.currentGadget.network = network;
            $state.go(state,
                {
                    device_make:  $stateParams.device_make,
                    device_model: $stateParams.device_model,
                    device_size:  $stateParams.device_size,
                    device_network: network.name
                });
            $event.preventDefault();
        }
    });

app.controller('DeviceConditionController',
    function (CurrentModel,$scope, $stateParams, GadgetsInfoServ, $state,$rootScope) {

        $scope.tooltips = {
            normal_condition:
        '<ul class="list-unstyled text-left"><li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Powers on and makes calls</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> No visible scratches or cracks</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> All buttons click</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Has never been repaired in any way</li></ul>',
            cracked_condition:
        '<ul class="list-unstyled text-left"><li><span class="glyphicon glyphicon-ok text-info text-justify"></span>Minor scratches or cracks on device</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Has been repaired in any way</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Some Buttons are not functional</li>' +
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Normal wear and tear</li>' +
        '</ul>',
            faulty_condition:
        '<ul class="list-unstyled text-left"><li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Does not power on or make calls</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Buttons not functional</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Serious physical damage to frame like bends or cracks</li>'+
        '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Water damaged before</li>'+
            '<li><span class="glyphicon glyphicon-ok text-info text-justify"></span> Faulty touch screen/ broken LCD</li></ul>'
        };

        $scope.conditions = GadgetsInfoServ.getConditions();
        $scope.image_url = $scope.currentGadget.model.image_url || '/Assets/img/smartphone.png';
        $rootScope.big_heading = 'Great! Finally, Which of these best describes your gadget\'s condition';

        $scope.$emit('progress-update-event', '70%');

        $scope.device_class = $rootScope.device_make = 'others';

        $scope.image_label = $scope.currentGadget.make +' '+
                             $scope.currentGadget.model.model+ ' '+
                             $scope.currentGadget.size.value + ' ';

        $scope.viewReward = function (state,radioModel) {
            for(var i = 0;i < $scope.conditions.length;i++){
                if($scope.conditions[i].slug == radioModel) {
                    $scope.currentGadget.condition_value = $scope.conditions[i].value;
                    break;
                }
            }
            $scope.currentGadget.condition = radioModel;

            $scope.$emit('progress-update-event', '100%');
            $state.go(state,
                {
                    device_make:  $stateParams.device_make,
                    device_model: $stateParams.device_model,
                    device_size:  $stateParams.device_size,
                    device_network: $stateParams.device_network,
                    device_condition: $scope.currentGadget.condition
                }
            );
        }
    });

app.controller('DeviceRewardController',
    function ($scope,$rootScope,$filter) {
        $rootScope.big_heading = 'Fantastic,Thank you! Here\'s your Reward';

        var reward = $scope.currentGadget.getReward();
        $scope.currentGadget.reward = reward;

        if(angular.isNumber(reward)){
            $scope.reward_price = $filter('currency')(reward,'₦') + '*';
            $scope.reward_message = 'Estimated Value is';
            $scope.reward_disclaimer = '*this value is subject to final verification by our engineers.'
        }else{
            $scope.reward_price = reward;
        }
    });

app.controller(
    'BookAppointmentController',
    function ($scope, $stateParams, $cookieStore, MailServ,$state,$rootScope, GadgetsInfoServ) {
        $rootScope.big_heading = "Book your Swap Now!";
        var currentDevice = $scope.currentGadget;
        currentDevice.swap_center = $stateParams.swap_center;
        $scope.swap_center = $stateParams.swap_center.split('-').join(' ');

        $scope.sendMail = function (destination,phone, message) {
            var info = {
                device: currentDevice,
                user: {
                    email: destination,
                    phone: phone
                }
            };

            var p = GadgetsInfoServ.postSwapDetails(info);
            p.then(function(response){
                console.log(response);
            },function(response){
                console.log(response);
            });

            var promise = MailServ.send(message, destination);
            promise.then(function (data) {
                console.log(data);
                $state.go('success');
            }, function (response) {
                console.log(response);
                alert('Error Occured, try again');
            });
        }
    });