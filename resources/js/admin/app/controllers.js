/**
 * Created by Ak on 2/19/2015.
 */
var module = angular.module('adminApp.controllers', ['adminApp.services']);

module.controller('NewTicketController', [
    '$scope','TicketServ', '$state', '$stateParams', 'GradeDeviceServ',
    function ($scope,TicketServ, $state, $stateParams, GradeDeviceServ) {
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
            if(!stepTwoActive()){
                return;
            }
            console.log('test change');
            console.log(newV);
            var ready = checkTestsPassed(newV);
            setViewState(ready);
        }, true);


        $scope.$watch('ticket.gradingSystem', function (newV, oldV) {
            if(!stepThreeActive()){
                return;
            }
            console.log('gradingSystem change');
            console.log(newV);
            $scope.ticket.device_grade = GradeDeviceServ.getGrade(newV);
            console.log('Grade:' + $scope.ticket.device_grade);
        }, true);

        $scope.createTicket = function (ticket) {
            var ticketSaved = TicketServ.save(ticket);
            ticketSaved.$promise.then(function (ticket) {
                $scope.isCreatingTicket = false;
                if (ticket.hasOwnProperty('id')) {
                    $scope.ticket.savedTicket = ticket;
                    console.log(ticket);
                }else{
                    console.log('error');
                    $scope.creationError = true;
                }
            }, function (ticket) {
                alert("failed");
                console.log(ticket);
                $scope.creationError = true;
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
            $state.go('ticket.evaluate', {'id': $scope.ticket.savedTicket.id });
        };

        function stepTwoActive(){
            return $scope.activeStep == 'stepTwo';
        }

        function stepThreeActive(){
            return $scope.activeStep == 'stepThree';
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
    }]);