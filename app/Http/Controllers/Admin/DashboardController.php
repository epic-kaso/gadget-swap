<?php namespace SupergeeksGadgetSwap\Http\Controllers\Admin;

use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;
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


class DashboardController extends Controller {

    public function getIndex() {

        $model = Request::input('model', null);
        $gadgetMakers = GadgetMaker::get();
        $networks = Network::get();

        if (empty($model)) {
            $neededGadgets = Gadget::with(['gadget_maker','sizes','colors','base_line_prices'])->get();
        } else {
            $maker = GadgetMaker::findOrFail($model);
            $neededGadgets = $maker->gadgets;
        }


        if (Request::ajax()) {
            $data = array(
                'models' => $gadgetMakers->toArray(),
                'devices' => $neededGadgets->toArray()
            );
            return Response::json($data);
        } else {
            $data = array(
                'models' => $gadgetMakers,
                'devices' => $neededGadgets,
                'networks' => $networks
            );
            return view('server.dashboard',$data);
        }
    }

}
