@extends('admin.layout')
@section('content')


    <div class="col-md-8 col-offset-md-3">
        <div class="container">
            <div class="row">
                <div class="panel panel-default main-panel">
                    <div class="panel-body">
                        <div class="col-md-3 side-bar">
                            <div class="list-group my-menu-group">
                                <a class="list-group-item"
                                   ng-class="{'active': active_nav == 'ticket'}"
                                   ui-sref="ticket.menu"><span class="fa fa-ticket"></span> Ticket</a>
                                @if(Auth::user()->isAdmin())
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'advisers'}"
                                       ui-sref="advisers.menu"><span class="fa fa-user-secret"></span> Advisers</a>
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'device_brands'}"
                                       ui-sref="device_brands.menu"><span class="fa fa-apple"></span> Device Brands</a>
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'devices'}"
                                       ui-sref="devices.menu"><span class="fa fa-mobile-phone"></span> Device Models</a>
                                    <a class="list-group-item"
                                       ng-class="{'active': active_nav == 'networks'}"
                                       ui-sref="networks.menu"><span class="fa fa-globe"></span> Networks </a>
                                @endif
                                <a class="list-group-item" ui-sref="config"
                                   ng-class="{'active': active_nav == 'config'}"><span class="fa fa-cogs"></span>
                                    Settings</a>
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