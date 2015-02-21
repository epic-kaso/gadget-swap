<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;


use Input;
use Redirect;
use Response;
use SupergeeksGadgetSwap\Http\Controllers\Controller;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Network;


class NetworkController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return Network::all();
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
        $data = Input::all();

        if(!isset($data['name']) || !isset($data['description']))
        {
            return Redirect::back();
        }

        $make = Network::create($data);
        return Redirect::to(\URL::action('Admin\DashboardController@getIndex') . '#/networks');
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
