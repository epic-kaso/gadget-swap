/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope','$rootScope','TicketServ', '$state', '$stateParams', 'GradeDeviceServ',
    function ($scope,$rootScope,TicketServ, $state, $stateParams, GradeDeviceServ) {
        $scope.activeStep = 'stepOne';
        $state.isCreatingTicket = true;
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

        $rootScope.$on('cfpLoadingBar:loading',function(){
            $state.isCreatingTicket = true;
        });

        $rootScope.$on('cfpLoadingBar:completed',function(){
            $state.isCreatingTicket = false;
        });

        $scope.$watch('ticket.test', function (newV, oldV) {
            console.log('test change');
            console.log(newV);

            var ready = checkTestsPassed(newV);
            setViewState(ready);

        }, true);


        $scope.$watch('ticket.gradingSystem', function (newV, oldV) {
            console.log('gradingSystem change');
            console.log(newV);
            $scope.ticket.device_grade = GradeDeviceServ.getGrade(newV);
            console.log('Grade:' + $scope.ticket.device_grade);
        }, true);

        $scope.createTicket = function (ticket) {
            TicketServ.save(ticket, function (ticket) {
                console.log(ticket);
                if (typeof ticket.id != "undefined") {
                    $scope.ticket = ticket;
                    $scope.ticketObj = ticket;
                }
            }, function (ticket) {
                alert("failed");
                console.log(ticket);
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
            $scope.createTicket($scope.ticket);
        };

       //grade

        $scope.nextStepEvaluation = function () {
            $state.go('ticket.evaluate', {'id': $scope.ticketObj.id });
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