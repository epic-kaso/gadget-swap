<!DOCTYPE html>
<html class="no-js" ng-app="AdminApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
    <style>
        .size-info.list-group {
            margin-top: 4px;
        }

        .flyout-parent{
            position: relative;
        }

        .flyout{
            position: absolute;
            display: none;
            right: -50px;
            z-index: 100;
        }

        .flyout:hover{
            display: block !important;
        }
        .flyout-parent:hover + .flyout,.flyout-parent:active + .flyout{
            display: block !important;
        }

        .image-item {
            margin: 5px;  display: inline-block;  float: left;
        }
        .panel-body.image-roll {
            height: 300px;
            overflow-x: scroll;
        }

    </style>
</head>
<body>

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Laravel</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if (Auth::guest())
                    <li><a href="/auth/login">Login</a></li>
                @else
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/auth/logout">Logout</a></li>
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>


<div class="container">
    <div class="col-md-3">
        <div class="list-group">
            <a ui-sref="allDevices" ui-sref-active="active" class="list-group-item flyout-parent">
                All Devices <span class="glyphicon glyphicon-chevron-down pull-right"></span>
            </a>
            <div class="flyout">
                <ul class="list-group">
                    <li class="list-group-item"><a href="/devices">All</a></li>
                    @if(isset($models))
                        @foreach($models as $value)
                             <li class="list-group-item"><a href="?model={{ $value->id }}">{{ $value->name }}</a></li>
                        @endforeach
                    @endif
                </ul>
            </div>
            <a ui-sref="allUsers" ui-sref-active="active" class="list-group-item">Users</a>
            <a ui-sref="allNetworks" ui-sref-active="active" class="list-group-item">Networks</a>
        </div>

        <div class="list-group">
            <a class="list-group-item" ui-sref-active="active" ui-sref="addMaker">Add Make</a>
            <a class="list-group-item" ui-sref-active="active" ui-sref="addDevice">Add Device</a>
            <a class="list-group-item" ui-sref-active="active" ui-sref="addNetwork">Add Network</a>
        </div>

        {{--<div class="list-group">--}}
            {{--<a class="list-group-item" href="{{ route('logout') }}">--}}
                {{--Logout--}}
            {{--</a>--}}
        {{--</div>--}}

    </div>

    <div class="col-md-9">
        <div  class="row" ui-view>
        </div>
    </div>
</div>
</body>

<script id="AllDevices.html" type="text/ng-template">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h2>Devices</h2>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>Make</td>
                    <td>Model</td>
                    <td>Sizes</td>
                    <td>Colors</td>
                    <td>Baseline Price</td>
                    <td>Conditions</td>
                </tr>
            </thead>
            <tbody>
            @if(isset($devices))
                @foreach($devices as $value)
                    <tr>
                        <td>{{ $value->gadget_maker->name }}</td>
                        <td>{{ $value->model }}</td>
                        <td>
                            <ul class="list-unstyled">
                                @foreach($value->sizes as $s)
                                        <li> {{ $s->value }}</li>
                                @endforeach
                            </ul>
                        </td>
                        <td>
                            <ul class="list-unstyled">
                                @foreach($value->colors as $s)
                                        <li> {{ $s->value }}</li>
                                @endforeach
                            </ul>
                        </td>
                        <td>
                            <ul class="list-unstyled">
                                @foreach($value->base_line_prices as $s)
                                      <li>{{ $s->size }}: N{{ $s->value }}</li>
                                @endforeach
                            </ul>
                        </td>
                        <td>
                            <ul class="list-unstyled">
                                <li>Normal - {{ $value->gadget_maker->normal_condition }}%</li>
                                <li>Faulty - {{ $value->gadget_maker->scratched_condition }}%</li>
                                <li>Bad - {{ $value->gadget_maker->bad_condition }}%</li>
                            </ul>
                        </td>
                        <td>
                            <a ng-click="deleteItem({{ $value->id }})" class="btn btn-xs btn-danger">Delete</a>
                        </td>
                    </tr>
                @endforeach
            @endif
            </tbody>
        </table>
    </div>
</script>

<script id="AllNetworks.html" type="text/ng-template">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h2>Network providers</h2>
        </div>
        <table class="table table-striped">
            <tbody>
            <?php if(isset($networks)){
                $index = 0;
                foreach($networks as $value){
                    $index++;
                    ?>
                    <tr>
                        <td>{{ $index }}</td>
                        <td>
                            <h4>{{ $value->name }}</h4>
                            <p>
                                {{ $value->description }}
                            </p>
                        </td>
                        <td>
                            <a ng-click="deleteItem({{ $value->id }})" class="btn btn-xs btn-danger">Delete</a>
                        </td>
                    </tr>
                <?php
                }
            } ?>
            </tbody>
        </table>
    </div>
</script>

<script id="AddNetwork.html" type="text/ng-template">
    <div>
        <form action="{{ route('resources.networks.store') }}" method="post">
            <input type="hidden" name="_token" value="<?php echo csrf_token() ?>"/>
            <div class="col-md-6">
                <div  class="form-group">
                    <label>Network Name</label>
                    <input type="text" name="name" placeholder="e.g Mtn Ng" ng-blur="fetchImages(network_name + ' logo nigeria')" ng-model="network_name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Bonus Information</label>
                    <textarea class="form-control" name="description" placeholder="Get Extra 1 Gigabyte of data"></textarea>
                </div>

                <div class="panel panel-default" ng-if="images.length > 0">
                    <div class="panel-heading">
                        <label>Select image to use as logo (please choose a portrait) </label>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="image-item" ng-repeat="image in images">
                                <label>
                                    <img class="img-thumbnail img-responsive" ng-src="{| image.src |}" style="height: {| image.height || '150' |}px" />
                                    <input type="radio" name="logo_url" value="{| image.src |}" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="form-group">
                    <input type="submit" value="Submit"  class="btn"/>
                </div>
            </div>
        </form>
    </div>
</script>

<script id="AddMaker.html" type="text/ng-template">
<div>
    <form action="{{ route('resources.device_makers.store') }}" method="post">
        <input type="hidden" name="_token" value="<?php echo csrf_token() ?>"/>
        <div class="col-md-6">
            <div  class="form-group">
                <input type="text" name="name" placeholder="Make" ng-blur="fetchImages(device_maker + ' logo')" ng-model="device_maker"   class="form-control"/>
            </div>
            <div class="form-group">
                <label for="scratched-condition">Normal Condition Value (%):</label>
                <input type="text" value="100" id="scratched-condition" name="normal_condition" placeholder="%" class="form-control">
            </div>
            <div class="form-group">
                <label for="scratched-condition">Scratched Condition Value (%):</label>
                <input type="text" id="scratched-condition" name="scratched_condition" placeholder="%" class="form-control">
            </div>
            <div class="form-group">
                <label for="bad-condition">Bad Condition Value (%):</label>
                <input type="text" id="bad-condition" name="bad_condition" placeholder="%" class="form-control">
            </div>

            <div class="panel panel-default" ng-if="images.length > 0">
                <div class="panel-heading">
                    <label>Select image to use as logo (please choose a portrait) </label>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="image-item" ng-repeat="image in images">
                            <label>
                                <img class="img-thumbnail img-responsive" ng-src="{| image.src |}" style="height: {| image.height || '150' |}px" />
                                <input type="radio" name="logo_url" value="{| image.src |}" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="form-group">
                <input type="submit" value="Submit"  class="btn"/>
            </div>
        </div>
    </form>
</div>
</script>
<script id="AddDevice.html" type="text/ng-template">
    <div>
        <form action="{{ route('resources.devices.store') }}" method="post">
            <input type="hidden" name="_token" value="<?php echo csrf_token() ?>"/>
            <div  class="form-group">
                <label>Select Device Make</label>
                <select class="form-control" name="gadget_maker_id" ng-model="device_make_name">
                    @if(isset($models))
                        @foreach($models as $value)
                            <option value="{{ $value->id }}">{{ $value->name }}</option>
                        @endforeach
                    @endif
                </select>
            </div>

            <div class="form-group">
                <label>Provide Device Model</label>
                <input type="text" placeholder="e.g Galaxy S5" ng-blur="fetchImages(device_make_name + ' ' +device_model_name)" ng-model="device_model_name" name="model" class="form-control"/>
            </div>

            <div  class="form-group">
                <label>Add Memory Sizes</label>
                <div class="input-group size-info">
                    <input type="text" name="device-size" ng-model="device_size" class="form-control" placeholder="e.g 16gb">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" ng-click="addToSizes(device_size)">Add</button>
                    </span>
                </div>
                <ul class="size-info list-group" ng-if="sizes.length > 0">
                    <li class="size-info list-group-item" ng-repeat="size in sizes"><span ng-bind="size"></span> <span class="btn pull-right btn-xs btn-danger" ng-click="removeSize($index)">X</span></li>
                </ul>

                <textarea style="display: none" name="sizes" ng-model="sizes_string" placeholder="Sizes, seperate each with a comma" class="form-control"></textarea>
            </div>

            <div  class="form-group">
                <label ng-if="sizes.length > 0">Provide Device BaseLine Price</label>
                <table class="size-info table" ng-if="sizes.length > 0">
                    <tr class="size-info" ng-repeat="size in sizes">
                        <td colspan="2"><span ng-bind="size"></span></td>
                        <td>
                          <input type="number"
                                 name="base_line_price"
                                 ng-change="updateBaseLineString()"
                                 ng-model="baseLinePrice[size]"
                                 ng-blur="updateBaseLineString()"
                                 class="form-control"
                                 placeholder="e.g 20000">
                        </td>
                    </tr>
                </table>
                <textarea name="baselines" style="display: none;" placeholder="baseline price eg 16gb: 10000,32gb: 20000" ng-model="baseLinePriceString" class="form-control"></textarea>
            </div>

            <div class="panel panel-default" ng-if="images.length > 0">
                <div class="panel-heading">
                    <label>Select image to use as logo (please choose a portrait) </label>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="image-item" ng-repeat="image in images">
                            <label>
                                <img class="img-thumbnail img-responsive" ng-src="{| image.src |}" style="height: {| image.height || '150' |}px" />
                                <input type="radio" name="device_image_url" value="{| image.src |}" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div  class="form-group">
                <input type="submit" value="Submit" class="btn"/>
            </div>
        </form>
    </div>
</script>

<script src="{{ asset('app/libs/core.js') }}"></script>
<script>
    var app = angular.module('AdminApp',[
        'ui.router',
        'ngAnimate'
    ],function($interpolateProvider) {
        $interpolateProvider.startSymbol('{|');
        $interpolateProvider.endSymbol('|}');
    });

    app.factory('ImageFetcher',function($http,$q){
       var searchUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAJ_8QtWECvWTcrukqvfLmRWdARJ2bI2rk&cx=011505858740112002603:dap5yb7naau&q=";

        return {
            fetch: function(query){
                var images = [];
                var deferred = $q.defer();
                $http.get(searchUrl+encodeURI(query)).then(function(response){
                    console.log(response.data);
                    response.data.items.forEach(function(currentValue){
                        if(angular.isDefined(currentValue.pagemap)) {
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
                },function(response){
                    console.log(response);
                    deferred.reject(response);
                });

                return deferred.promise;
            }
        }

    });
    app.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        var allDevices = {
            name: 'allDevices',
            url: "/",
            templateUrl: "AllDevices.html",
            controller: function($scope,$http){
                $scope.deleteItem = function(id){
                    var current = window.location.href,
                    url = window.location.origin +
                          window.location.pathname +
                          '/delete-device/'+id;
                   $http.delete(url).then(function(response){
                       location.reload();
                   },function(response){
                       alert(response);
                   });
                }
            }
        };

        var allUsers = {
            name: 'allUsers',
            url: "/all-users",
            templateUrl: "AllUsers.html",
            controller: function($scope){

            }
        };

        var allNetworks = {
            name: 'allNetworks',
            url: "/all-networks",
            templateUrl: "AllNetworks.html",
            controller: function($scope){

            }
        };

        var addNetwork = {
            name: 'addNetwork',
            url: "/add-network",
            templateUrl: "AddNetwork.html",
            controller: function($scope,ImageFetcher){
                $scope.fetchImages = function(name){
                    var promise = ImageFetcher.fetch(name);
                    promise.then(function(images){
                        $scope.images = images;
                    });
                };
            }
        };

        var addMaker = {
            name: 'addMaker',
            url: "/add-maker",
            templateUrl: "AddMaker.html",
            controller: function($scope,ImageFetcher){
                $scope.fetchImages = function(name){
                    var promise = ImageFetcher.fetch(name);
                    promise.then(function(images){
                        $scope.images = images;
                    });
                };
            }
        };

        var addDevice = {
            name: 'addDevice',
            url: "/add-device",
            templateUrl: "AddDevice.html",
            controller: function($scope,ImageFetcher){
                $scope.sizes = [];
                $scope.sizes_string = '';
                $scope.baseLinePrice = {};
                $scope.baseLinePriceString = '';
                $scope.images = [];

                $scope.fetchImages = function(name){
                    var promise = ImageFetcher.fetch(name);
                    promise.then(function(images){
                        $scope.images = images;
                    });
                };

                function createStringVersion(){
                    $scope.sizes_string =  $scope.sizes.join();
                }

                $scope.addToSizes = function(device_size){
                    $scope.sizes.push(device_size);
                    $scope.device_size = null;
                    createStringVersion();
                };

                $scope.removeSize = function(index){
                    $scope.sizes.splice(index,1);
                    createStringVersion();
                };

                $scope.updateBaseLineString = function(){
                    var temp = [];
                    angular.forEach($scope.baseLinePrice,function(value,key){
                        temp.push(""+key+": "+value);
                    });
                    $scope.baseLinePriceString = temp.join();
                }
            }
        };

        $stateProvider
            .state(allDevices)
            .state(addDevice)
            .state(addMaker)
            .state(allNetworks)
            .state(allUsers)
            .state(addNetwork);

    });
</script>
</html>
