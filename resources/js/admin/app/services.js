

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

app.factory('GradeDeviceServ', function ($rootScope) {

    var threshold = {
        'A': 8.1,
        'B': 5.85
    };

    function generateGradePoint(device) {
        var result = {gradePoint: 0};

        angular.foreach(device, function (value, key) {
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
});


app.factory('ImageFetcher', function ($http, $q) {
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

});