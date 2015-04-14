<!DOCTYPE html>
<html class="no-js" ng-app="SupergeeksWidget">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
    {{-- Laravel Based  --}}
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{ asset('app/css/main.css') . '?' .time() }}">
    <script>
        window.gadget_swap = {};
        window.gadget_swap.data = {!! json_encode($objects) !!};
        window.gadget_swap.image_asset_root = "{{ asset('app/img/') }}";
    </script>
</head>
<body>
<div class="navbar navbar-plain">
    <div class="container-fluid">
        <div class="navbar-header">
            <img src="http://supergeeks.com.ng/img/supergeeks-logo-tagline.png" class="img-responsive"/>
        </div>
        <div class="info-header">
            <div class="tiny-heading text-muted"><h4 ng-bind-html="tiny_heading"></h4></div>
            <div class="big-heading"><h1 ng-bind="big_heading" style="color: #43bcf0"></h1></div>
        </div>
    </div>
</div>

<div class="container" style="padding-bottom: 200px;">
    <div class="row">
        <div class="col-md-12 col-lg-offset-1 col-lg-10">
            <div class="widget-canvas">
                <div ui-view class="v">
                    <div class="" style="
                        padding-top: 50px;
                    ">
                        <img src="{{ asset('app/img/loading.gif') }}" class="img-responsive" style="
                            margin-left: auto;
                            margin-right: auto;
                        ">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="navbar navbar-white navbar-fixed-bottom" ng-controller="NavbarController">
    <div class="progress-bar" progress-bar val="progress"></div>
    <div class="container-fluid">
        <div class="progress-item back-button" previous-button>
            <span class="glyphicon glyphicon-chevron-left back-button"></span>
        </div>
        <div class="progress-item">
            <a
                class="btn"
                ui-sref="device-make"
                ui-sref-active="active">
                <p>Device</p>
                <span>@{{ currentGadget.make | limitTo : 14 }}</span>
            </a>
        </div>

        <div class="progress-item">
            <a
                class="btn"
                ng-class="{disabled: !currentGadget.make}"
                ui-sref="device-model({device_make: currentGadget.make})"
                ui-sref-active="active">
                <p>Model</p>
                <span>@{{ currentGadget.model.model | limitTo : 14 }}</span>
            </a>
        </div>

        <div class="progress-item">
            <a
                class="btn"
                ui-sref="device-size({device_make: currentGadget.make,device_model: currentGadget.model.slug})"
                ng-class="{disabled: !currentGadget.make || !currentGadget.model.slug}"
                ui-sref-active="active">
                <p>Size</p>
                <span>@{{ currentGadget.size.value | limitTo : 14 }}</span>
            </a>
        </div>

        <div class="progress-item">
            <a
                class="btn"
                ui-sref="device-network({device_make: currentGadget.make,device_model: currentGadget.model.slug,device_size: currentGadget.size.slug})"
                ng-class="{disabled: !currentGadget.make || !currentGadget.model.slug || !currentGadget.size.slug}"
                ui-sref-active="active">
                <p>Network</p>
                <span>@{{ currentGadget.network.name | limitTo : 14 }}</span>
            </a>
        </div>

        <div class="progress-item">
            <a
                class="btn"
                ng-class="{disabled: !currentGadget.make || !currentGadget.model.slug || !currentGadget.size.slug || !currentGadget.network.name}"
                ui-sref="device-condition({device_make: currentGadget.make,device_model: currentGadget.model.slug,device_size: currentGadget.size.slug,device_network: currentGadget.network.slug})" ui-sref-active="active">
                <p>Condition</p>
                <span>@{{ currentGadget.condition | limitTo : 14 }}</span>
            </a>
        </div>
    </div>
</div>

<script src="{{ asset('app/libs/core.js') . '?' .time() }}"></script>
<script src="{{ asset('app/libs/others.js') . '?' .time() }}"></script>
<script src="{{ asset('app/js/main.js') . '?' .time() }}"></script>
</body>
</html>
