<?php
/**
 * Created by PhpStorm.
 * User: Ak
 * Date: 2/19/2015
 * Time: 11:38 PM
 */

namespace SupergeeksGadgetSwap\Repositories;


use SupergeeksGadgetSwap\Gadget;
use SupergeeksGadgetSwap\GadgetMaker;
use SupergeeksGadgetSwap\Network;

class DevicesRepository {

    private $gadget;
    private $gadgetMaker;
    private $network;

    function __construct(Gadget $gadget,GadgetMaker $gadgetMaker,Network $network)
    {
        $this->gadget = $gadget;
        $this->gadgetMaker = $gadgetMaker;
        $this->network = $network;
    }


    public function getAllDevices(){
        return $this->gadget->with('sizes','colors','base_line_prices','gadget_maker')->get();
    }


    public function getAllDeviceMakers(){
        return $this->gadgetMaker->with('gadgets.sizes','gadgets.colors','gadgets.base_line_prices','gadgets.gadget_maker')->get();
    }

    public function getAllNetworks(){
        return $this->network->all();
    }
}