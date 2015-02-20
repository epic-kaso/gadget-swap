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