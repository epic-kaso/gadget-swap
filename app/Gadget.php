<?php namespace SupergeeksGadgetSwap;

    use Illuminate\Contracts\Events\Dispatcher;
    use Illuminate\Support\Str;


    class Gadget extends BaseModel{

        /**
         * Register any other events for your application.
         *
         * @param  Dispatcher  $events
         * @return void
         */
        public static function boot()
        {
            parent::boot();

            static::creating(function($item)
            {
                $item->attributes['slug'] =  Str::slug($item->attributes['model']);
            });

            static::saving(function($item){
               if(empty($item->slug)){
                   $item->attributes['slug'] =  Str::slug($item->attributes['model']);
               }
            });
        }

    public function sizes(){
        return $this->hasMany('SupergeeksGadgetSwap\Size');
    }

    public function colors(){
        return $this->hasMany('SupergeeksGadgetSwap\Color');
    }

    public function base_line_prices(){
        return $this->hasMany('SupergeeksGadgetSwap\BaseLinePrice');
    }

    public function gadget_maker(){
        return $this->belongsTo('SupergeeksGadgetSwap\GadgetMaker');
    }

    public function destroyEveryData(){
        $this->deleteRelationships(array('colors','sizes','base_line_prices'));
        $this->delete();
    }

    private function deleteRelationships($relationship){
        if(is_array($relationship)){
            foreach($relationship as $r){
                $relations = $this->{$r};
                $this->deleteThisRelationship($relations);
            }
            return true;
        }else{
            $relations = $this->{$relationship};
            return $this->deleteThisRelationship($relations);
        }
    }

        /**
         * @param $relations
         */
        private function deleteThisRelationship($relations)
        {
            if (count($relations) > 0) {
                foreach ($relations as $b) {
                    $b->delete();
                }
            }
            return true;
        }
    }