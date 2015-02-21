

/**
 * Created by Ak on 2/19/2015.
 */

var app =  angular.module('adminApp.services',[]);

app.factory('TicketServ', function($resource,URLServ){
    return $resource('/resources/ticket/:id',{id: '@id'});//URLServ.getResourceUrlFor("ticket"));
});

app.factory('URLServ', function($rootScope){
    return {
        "getResourceUrlFor": function(name){
            return $rootScope.data.resources[name];
        }
    }
});