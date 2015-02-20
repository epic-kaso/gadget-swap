<?php namespace SupergeeksGadgetSwap;

    use Illuminate\Support\Str;

    class GadgetMaker extends BaseModel{


        public static function boot()
        {
            parent::boot();

            static::creating(function($item)
            {
                $item->attributes['slug'] =  Str::slug($item->attributes['name']);
            });

            static::saving(function($item){
                if(empty($item->slug)){
                    $item->attributes['slug'] =  Str::slug($item->attributes['name']);
                }
            });
        }
    //Conditions
    //1. scratched_condition
    //2. bad_condition
    //3. normal_condition


    public function gadgets(){
        return $this->hasMany('SupergeeksGadgetSwap\Gadget');
    }

}