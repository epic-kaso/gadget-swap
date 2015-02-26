/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope','TicketServ','TicketColumns', '$state', '$stateParams','DeviceBrands','ToastService',
    'GradeDeviceServ','$cookieStore','Networks','GadgetEvaluationReward','Airtel','GradingSystem',
    function ($scope,TicketServ,TicketColumns, $state, $stateParams,DeviceBrands,ToastService,
              GradeDeviceServ,$cookieStore,Networks,GadgetEvaluationReward,Airtel,GradingSystem) {
        $scope.device_brands = DeviceBrands;
        $scope.TicketColumns = TicketColumns;
        $scope.activeStep = 'stepOne';
        $scope.isCreatingTicket = true;
        $scope.creationError = false;
        $scope.ticket = {
            test: {
                deviceBoot: '',
                callUnlock: '',
                wirelessConnection: '',
                icloudConnection: ''
            },
            gradingSystem: GradingSystem
        };
        $scope.selected = {};
        $scope.networks = Networks;
        $scope.brand = {};
        $scope.device = {};
        $scope.activeNextButton = false;
        $scope.airtel = Airtel;
        $scope.portToAirtel = false;

        $scope.$watch('ticket.test', function (newV, oldV) {
            if(!stepThreeActive()){
                return;
            }
            console.log('test change');
            console.log(newV);
            var ready = checkTestsPassed(newV);
            setViewState(ready);
        }, true);


        $scope.$watch('ticket.gradingSystem', function (newV, oldV) {
            if(!stepFourActive()){
                return;
            }
            console.log('gradingSystem change');
            console.log(newV);
            $scope.ticket.device_grade = GradeDeviceServ.getGrade(newV);
            console.log('Grade:' + $scope.ticket.device_grade);
        }, true);

        $scope.$watch('brand.selectedIndex', function (newV, oldV) {
            if(!stepTwoActive()){
                return;
            }
            console.log('brand changed');
            $scope.selected.brand = $scope.device_brands[newV];
            $scope.devices = $scope.selected.brand.gadgets;
            //brand.selected
        });

        $scope.$watch('device.selectedIndex', function (newV, oldV) {
            if(!stepTwoActive()){
                return;
            }
            console.log('device changed');
            $scope.selected.device = $scope.devices[newV];
            $scope.ticket.gadget_id = $scope.selected.device.id;
        });


        $scope.createTicket = function (ticket) {
            ticket.network_id = parseInt(ticket.network_id);
            ticket.size_id = parseInt(ticket.size_id);

            var ticketSaved = TicketServ.save(ticket);
            ticketSaved.$promise.then(function (ticket) {
                $scope.isCreatingTicket = false;
                if (ticket.hasOwnProperty('id')) {
                    $scope.ticket.savedTicket = ticket;
                    console.log(ticket);
                }else{
                    console.log('error');
                    $scope.creationError = true;
                    ToastService.error("Could not create ticket, please try again later");
                }
            }, function (ticket) {
                alert("failed");
                console.log(ticket);
                $scope.creationError = true;
                ToastService.error("Could not create ticket, please try again later");
            });
        };


        $scope.nextStepOne   = function() {
            $scope.activeStep = 'stepOne';
            $state.go('ticket.add.stepOne');
        };

        $scope.nextStepTwo   = function() {
            $scope.activeStep = 'stepTwo';
            $state.go('ticket.add.stepTwo');
        };

        $scope.nextStepThree = function () {
            $scope.activeStep = 'stepThree';
            $state.go('ticket.add.stepThree');
        };

        $scope.nextStepFour = function () {
            $scope.activeStep = 'stepFour';
            $state.go('ticket.add.stepFour');
        };

        $scope.nextStepFinal = function () {
            $scope.activeStep = 'stepFinal';
            calculateDeviceReward();
            $state.go('ticket.add.final');
            $scope.createTicket($scope.ticket);
        };

        $scope.nextStepAcceptTerms = function () {
            $scope.activeStep = 'stepAcceptTerms';
            updateTicketsPortToAirtel();
            $state.go('ticket.accept-terms', {id: $scope.ticket.savedTicket.id});
        };

        $scope.goHome = function () {
            $state.go('ticket.menu');
        };

        function calculateDeviceGrade(){
            return $scope.ticket.device_grade;
        }

        function calculateDeviceReward(){
            $scope.selected.grade = calculateDeviceGrade();
            $scope.selected.size = $scope.ticket.size_id;
            $scope.ticket.reward = GadgetEvaluationReward.calculate($scope.selected);
        }

        function stepTwoActive(){
            return $scope.activeStep == 'stepTwo';
        }

        function stepThreeActive(){
            return $scope.activeStep == 'stepThree';
        }
        function stepFourActive(){
            return $scope.activeStep == 'stepFour';
        }
        function stepFinalActive(){
            return $scope.activeStep == 'stepFinal';
        }

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

        function updateTicketsPortToAirtel() {
            //$scope.ticket.savedTicket.port_to_airtel = $scope.portToAirtel;

            TicketServ.update({id:  $scope.ticket.savedTicket.id},  $scope.ticket.savedTicket);
        }
    }]);