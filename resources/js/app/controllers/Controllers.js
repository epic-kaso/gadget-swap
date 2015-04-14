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
        $rootScope.big_heading = 'Fantastic,Thank you! Estimated Value is';

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