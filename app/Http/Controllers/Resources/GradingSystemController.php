<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use Response;
use SupergeeksGadgetSwap\GradingSystem;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;

use Illuminate\Http\Request;

class GradingSystemController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$data = GradingSystem::presentAll();

        return Response::json($data);
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
		//
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
		$item  = GradingSystem::find($id);
        $item->weight  = \Input::get('weight',$item->weight);
        $item->save();

        return $item;
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
