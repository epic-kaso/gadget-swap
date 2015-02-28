<!DOCTYPE html>
<html lang="en" ng-app="AdminApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GadgetSwap</title>

    <link href="{{ asset('admin/css/admin.css')."?".time() }}" rel="stylesheet">

    <!-- Fonts -->
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Gadget Swap</a>
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
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-expanded="false">{{ explode('@',Auth::user()->email)[0] }} <span
                                    class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/auth/logout">Logout</a></li>
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
<div class="container start">
    <div class="row">
        @yield('content')
    </div>
</div>

<toast type="toast.type" show="toast.show" messages="toast.messages"></toast>

<!-- Scripts -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="{{ asset('app/libs/core_main.js')."?".time() }}" ></script>
<script src="{{ asset('app/libs/others_main.js')."?".time() }}" ></script>
<script src="{{ asset('admin/js/admin_main.js')."?".time() }}"></script>
<script>
    var app = angular.module("AdminApp");
    app.constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
    app.factory("CurrentUser",function(){
        return {
            get: function(){
                return JSON.parse('<?php echo Auth::user()->toJson(); ?>');
            }
        }
    });

    app.factory("ScriptCam",function(){
        return {
            path: "/admin/webcam/"
        }
    });

    app.factory("PRELOAD_UI_LIST",function(){
        return {
            'get': function(){
                return [
                    "partials/ticket/menu.html?{{ time() }}",
                    "partials/ticket/dashboard.html?{{ time() }}",
                    "partials/ticket/show.html?{{ time() }}",
                    "partials/ticket/evaluation/review.html?{{ time() }}",
                    "partials/ticket/evaluation/terms.html?{{ time() }}",
                    "partials/ticket/done.html?{{ time() }}",
                    "partials/ticket/search.html?{{ time() }}",
                    'partials/ticket/list.html',
                    "partials/ticket/add/base.html?{{ time() }}",
                    "partials/ticket/add/step-one.html?{{ time() }}",
                    "partials/ticket/add/step-two.html?{{ time() }}",
                    "partials/ticket/add/step-three.html?{{ time() }}",
                    "partials/ticket/add/step-four.html?{{ time() }}",
                    "partials/ticket/add/final.html?{{ time() }}"
                    @if(Auth::user()->isAdmin())
                    ,
                    "partials/advisers/menu.html?{{ time() }}",
                    "partials/advisers/dashboard.html?{{ time() }}",
                    "partials/advisers/search.html?{{ time() }}",
                    "partials/advisers/list.html?{{ time() }}",
                    "partials/advisers/add/add.html?{{ time() }}",
                    "partials/device_models/search.html?{{ time() }}",
                    "partials/device_brands/search.html?{{ time() }}",
                    "partials/networks/search.html?{{ time() }}",
                    "partials/networks/dashboard.html?{{ time() }}",
                    "partials/networks/menu.html?{{ time() }}",
                    "partials/device_models/menu.html?{{ time() }}",
                    "partials/device_brands/menu.html?{{ time() }}",
                    "partials/device_models/dashboard.html?{{ time() }}",
                    "partials/device_brands/dashboard.html?{{ time() }}",
                    "partials/networks/add.html?{{ time() }}",
                    "partials/device_models/add.html?{{ time() }}",
                    "partials/device_brands/add.html?{{ time() }}",
                    "partials/networks/list.html?{{ time() }}",
                    "partials/device_models/list.html?{{ time() }}",
                    "partials/device_brands/list.html?{{ time() }}"
                    @endif
                ];
            }
        }
    });
</script>
</body>
</html>
