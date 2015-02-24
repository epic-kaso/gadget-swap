<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'GadgetSwapController@getIndex');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
//,'middleware' => 'auth'
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => 'auth-adviser'], function () {
    Route::get('dashboard',['as' => 'devices','uses' => 'DashboardController@getIndex']);
});


Route::group(['prefix' => 'resources', 'namespace' => 'Resources','middleware' => 'auth'], function () {
    Route::resource('devices','DevicesController');
    Route::resource('device_makers','DeviceMakerController');
    Route::resource('networks','NetworkController');
    Route::resource('swap_user','SwapUsersController');
    Route::resource('ticket','GadgetSwapTicketController');
    Route::resource('mail', 'MailerController');
    Route::resource('advisers','AdvisersController');
    Route::resource('ticket-config','TicketDataConfigController');
});
