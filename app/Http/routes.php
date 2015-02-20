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

Route::get('/', 'GadgetSwapController@getClient');

Route::group(['prefix' => 'resources','namespace' => 'Resources'],function(){
    Route::resource('devices','DevicesController');
});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
Route::group([],function(){
           Route::get('/devices',['as' => 'devices','uses' => 'GadgetSwapController@getIndex']);
           Route::post('/devices/add-maker','GadgetSwapController@postAddMake');
           Route::post('/devices/add-network','GadgetSwapController@postAddNetwork');
           Route::post('/devices/add-device','GadgetSwapController@postAddModel');
           Route::delete('/devices/delete-device/{id}','GadgetSwapController@deleteGadget');
});