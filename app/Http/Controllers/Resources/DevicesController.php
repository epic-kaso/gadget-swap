<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Input;
use Redirect;
use Request;
use Response;
use SupergeeksGadgetSwap\BaseLinePrice;
use SupergeeksGadgetSwap\Gadget;
use SupergeeksGadgetSwap\GadgetMaker;
use SupergeeksGadgetSwap\Network;
use SupergeeksGadgetSwap\Repositories\DevicesRepository;
use SupergeeksGadgetSwap\Size;

class DevicesController extends Controller {


    private $devicesRepository;

    function __construct(DevicesRepository $devicesRepository)
    {
        $this->devicesRepository = $devicesRepository;
    }


    /**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return $this->devicesRepository->getAllDeviceMakers();
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

        if(
            !isset($data['model']) ||
            !isset($data['gadget_maker_id']) ||
            !isset($data['sizes']) ||
            !isset($data['baselines'])
        ){
            return Redirect::back();
        }

        $make = Gadget::create(array(
            'model' => $data['model'],
            'gadget_maker_id' => $data['gadget_maker_id']
        ));

        $sizes = explode(',', $data['sizes']);
        foreach ($sizes as $size) {
            $make->sizes()->save(new Size(array('value' => trim($size))));
        }

        $baselines = BaseLinePrice::extractBaseLinePrices($data['baselines']);
        foreach ($baselines as $key => $value) {
            $make->base_line_prices()->save(
                new BaseLinePrice(
                    array('size' => trim($key), 'value' => trim($value)
                    )
                )
            );
        }

        if(isset($data['device_image_url'])){
            $make->image_url = $data['device_image_url'];
        }
        $make->save();

        return Redirect::action('GadgetSwapController@getIndex');
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

        $g = Gadget::find($id);
        $g->destroyEveryData();

        if (Request::ajax()) {
            return Response::json(array(
                'status' => 'success',
                'url' => route('GadgetSwapController@getIndex')
            ));
        } else {
            return Redirect::action('GadgetSwapController@getIndex');
        }
	}

}
