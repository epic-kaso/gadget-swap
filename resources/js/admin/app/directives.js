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

app.directive('toast',function($animate,$timeout){
    return {
        'restrict': 'EA',
        'template': '<div class="toast alert alert-{{ type }}" ><ul><li ng-repeat="message in messages"> {{ message }}</li></ul></div>',
        scope: {
            type: '=type',
            messages: '=messages',
            show: '=show'
        },
        'link': function link(scope, element, attrs) {
            function showToast() {
                //$animate.addClass(element,'toast-alert');
                element.css({opacity: 1});
                $timeout(hideToast,10000);
            }

            function hideToast() {
                element.css({opacity: 0});
                //$animate.removeClass(element,'toast-alert');
            }
            showToast();
            scope.$watch(function() { return scope.show; },function(newV,oldV){
                if(newV == true){
                    showToast();
                }else{
                    hideToast();
                }
            })
        }
    }
});
