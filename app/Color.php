<?php namespace SupergeeksGadgetSwap;


class Color extends BaseModel{

    public function gadget(){
        return $this->belongsTo('SupergeeksGadgetSwap\Gadget');
    }
}