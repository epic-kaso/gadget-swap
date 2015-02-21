<?php namespace SupergeeksGadgetSwap;


use Illuminate\Support\Str;

class GadgetSwapTicket extends BaseModel {

	/*
	 *  $table->string('customer_last_name');
            $table->string('customer_first_name');
            $table->string('customer_phone_number');
            $table->string('customer_email');
            $table->string('customer_device_imei');
	 */

    protected $guarded = ['id'];
    protected $hiddent = ['id'];

    public static function boot(){
        parent::boot();

        static::creating(function($model){
            $model->generateHashCode();
        });
    }


    public function generateHashCode(){
        if(!empty($this->attributes['hashcode'])){
            return;
        }

        $hashcode = Str::random(8);

        if($this->hashcodeExists($hashcode)){
            return $this->generateHashCode();
        }

        $this->attributes['hashcode'] = $hashcode;

        return true;
    }

    private function hashcodeExists($hashcode)
    {
        $item  = static::whereHashcode($hashcode)->first();

        return is_null($item) ? false : true;
    }
}
