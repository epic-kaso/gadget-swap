@extends('admin.layout')
@section('content')


    <div class="col-md-8 col-offset-md-3">
        <div class="container">
            <div class="row">
                <div class="panel panel-default main-panel">
                    <div class="panel-body">
                        <div class="col-md-3 side-bar">
                            <div class="list-group my-menu-group">
                                <a class="list-group-item {{ $inmates or '' }}" ui-sref-active="active" ui-sref="inmates"><span class="fa fa-users"></span> Ticket</a>
                                <a class="list-group-item {{ $cells or '' }}" ui-sref-active="active" ui-sref="device_brands"><span class="fa fa-building"></span> Device Brands</a>
                                <a class="list-group-item {{ $sentences or '' }}" ui-sref-active="active" ui-sref="devices"><span class="fa fa-folder"></span> Device Models</a>
                                <a class="list-group-item {{ $warders or '' }}" ui-sref-active="active" ui-sref="networks"><span class="fa fa-user-secret"></span> Networks </a>
                                <a class="list-group-item {{ $configurations or '' }}" ui-sref="config" ui-sref-active="active"><span class="fa fa-cogs"></span> Settings</a>


                            </div>
                        </div>

                        <div class="col-md-9 main-content">
                            <div class="main-content-container">
                                <div ui-view class="slide" autoscroll="false"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@stop