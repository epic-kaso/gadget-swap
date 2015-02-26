<?php namespace SupergeeksGadgetSwap;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GradingSystem extends Model {

	protected $table = "grading_systems";
    protected $guarded =  ['id'];

    public static function presentAll(){
        $response =  [];

        $all = static::all();

        foreach($all as $item){
            $temp = new \stdClass();
            $temp->weight = doubleval($item->weight);
            $temp->rating = '';
            $temp->presentation = Str::title(str_replace('_',' ',Str::snake($item->title)));
            $response[$item->title] = $temp;
        }
        return $response;
    }
}
