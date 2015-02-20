<?php namespace SupergeeksGadgetSwap\Http\Controllers;


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

class GadgetSwapController extends Controller {

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
	public function getIndex()
    {
        $data  = [];
        $data['models']  =  $this->devicesRepository->getAllDeviceMakers()->toArray();
        $data['networks'] = $this->devicesRepository->getAllNetworks()->toArray();
        return view('client.index',['objects' => $data]);
	}

    //Server


}
