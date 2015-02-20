<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use Input;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;

use Illuminate\Http\Request;
use SupergeeksGadgetSwap\SwapUser;

class SwapUsersController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        /*
        * {
        * "device":{
            *  "make":"Apple",
            *  "current_make":{"id":1},
            *  "model":{"id":15,"model":"Iphone 4s"},
            *  "size":{"id":27,"gadget_id":15,"name":"","value":"16gb","baseline_price":0,"slug":"16gb"},
            *  "baseLinePrice":"15000",
            *  "network":{"id":1,"name":"Airtel Ng","description":"Get Extra 1 gigabyte of data when you swap your phone"},
            *  "condition":"Like-New","condition_value":100
        *  },
        * "user":{
        *      "email":"lordkaso@gmail.com"
        *  }
        * }
        */
        $json_input_data = Input::all();

        $user = new SwapUser();
        $user->email = $json_input_data['user']['email'];
        $user->phone = $json_input_data['user']['phone'];
        $user->device_make = $json_input_data['device']['make'];
        $user->device_model = $json_input_data['device']['model']['id'];
        $user->device_size = $json_input_data['device']['size']['id'];
        $user->device_network = $json_input_data['device']['network']['id'];
        $user->device_condition = $json_input_data['device']['condition'];
        $user->swap_location = $json_input_data['device']['swap_location'];
        $user->device_reward = $json_input_data['device']['reward'];

        $user->save();

        return \Response::json($user);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
