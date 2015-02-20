<?php namespace SupergeeksGadgetSwap\Http\Controllers;

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
	public function getClient()
	{
//        $ms = GadgetMaker::get();
//        $networks = Network::get();
//
//        if (empty($model)) {
//            $ds = Gadget::get();
//        } else {
//            $ds = GadgetMaker::find($model)->gadgets;
//        }
//
//        $data = array(
//            'models' => array(),
//            'devices' => array(),
//            'networks' => array()
//        );
//
//        foreach($networks as $t){
//            $t->slug =  strtolower(Str::slug($t->name));
//            $data['networks'][] = $t;
//        }
//
//        foreach ($ms as $t) {
//            $t->image_url = strtolower($t->name) . '-logo.png';
//            $t->slug = Str::slug($t->name);
//            $data['models'][] = $t;
//        }
//        foreach ($ds as $t) {
//            $t->colors = $this->fetch_client_array($t->colors);
//            $t->sizes = $this->fetch_client_array($t->sizes);
//            $t->base_line_prices = $this->fetch_client_array($t->base_line_prices);
//            $t->slug = Str::slug($t->model);
//            $data['devices'][] = $t;
//        }
        $data  = [];
        $data['models']  =  $this->devicesRepository->getAllDeviceMakers()->toArray();
        $data['networks'] = $this->devicesRepository->getAllNetworks()->toArray();
        return view('client.index',['objects' => $data]);
	}
    
    function postSwapDetails(){
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
        $app = $this->getApp();
        //$details = $app->request->params();
        $json_input_data = json_decode(file_get_contents('php://input'),TRUE);

        $user = new User();
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

        $app->response->header('content-type','application/json');
        $app->response->write($user->to_json());
    }
    private function fetch_client_array($colors) {
        $r = array();
        if(count($colors) > 0) {
            foreach ($colors as $v) {
                if (isset($v->value))
                    $v->slug = Str::slug($v->value);
                elseif (isset($v->name))
                    $v->slug = Str::slug($v->name);
                $r[] = $v;
            }
        }
        return $r;
    }
    //Server

    function getIndex() {
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
                'models' => array(),
                'devices' => array()
            );

            foreach ($gadgetMakers as $t) {
                $t->image_url = strtolower($t->name) . '.png';
                $t->slug = Str::slug($t->name);
                $data['models'][] = $t;
            }
            foreach ($neededGadgets as $t) {
                $t->colors = $this->fetch_array($t->colors);
                $t->sizes = $this->fetch_array($t->sizes);
                $t->slug = Str::slug($t->model);
                $data['devices'][] = $t;
            }
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

    function postAddMake() {
        $data = Input::all();

        if(!isset($data['name']))
        {
            return Redirect::back();
        }

        $make = GadgetMaker::create($data);

        if(isset($data['normal_condition'])){
            $make->normal_condition = $data['normal_condition'];
        }

        if(isset($data['scratched_condition'])){
            $make->scratched_condition = $data['scratched_condition'];
        }

        if(isset($data['bad_condition'])){
            $make->bad_condition = $data['bad_condition'];
        }

        $make->save();

        return Redirect::action('GadgetSwapController@getIndex');
    }

    function postAddNetwork() {
        $data = Input::all();

        if(!isset($data['name']) || !isset($data['description']))
        {
            return Redirect::back();
        }

        $make = Network::create($data);

        return Redirect::action('GadgetSwapController@getIndex');
    }

    function postAddModel() {
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

    function getAllDevices() {

    }

    function deleteGadget($id) {

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

    private function fetch_array($colors) {
        $r = array();
        if(count($colors) > 0){
            foreach ($colors as $v) {
                $v->slug = Str::slug($v->value);
                $r[] = $v;
            }
        }
        return $r;
    }

}
