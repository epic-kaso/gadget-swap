/**
 * Created by Ak on 2/19/2015.
 */
var app = angular.module('adminApp.controllers', ['adminApp.services']);

app.controller('NewTicketController', [
    '$scope', 'TicketServ', '$state', '$stateParams', 'GradeDeviceServ',
    function ($scope, TicketServ, $state, $stateParams, GradeDeviceServ) {

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
            console.log('Grade:' + $scope.grade);
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
            $state.go('ticket.add.stepTwo');
        };

        $scope.nextStepThree = function () {
            $state.go('ticket.add.stepThree');
        };

        $scope.nextStepFinal = function () {
            $state.go('ticket.add.final');
            $state.isCreatingTicket  = true;
            $scope.createTicket($scope.ticket);
        };

       //grade

        $scope.nextStepEvaluation = function () {
            $state.go('ticket.evaluate', {'id': $scope.ticket.id, 'grade': $scope.ticket.grade});
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