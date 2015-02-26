<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;
use Schema;
use SupergeeksGadgetSwap\GadgetSwapTicket;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;


use SupergeeksGadgetSwap\Http\Requests\TicketDataConfigRequest;

class TicketDataConfigController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        //return \DB::select("SHOW COLUMNS FROM ".GadgetSwapTicket::$tableName);

        $cols = $this->getTableColumnsAsArray();

        $cols = array_values(array_filter($cols,function($item){
            return preg_match('/^customer.*/',$item) == 1 ? true : false;
        }));

        $cols = array_map(function($item){
            $obj = new \stdClass();
            $obj->name = $item;
            $obj->value = str_replace('_',' ',Str::title($item));
            $item = strtolower($item);

            if(str_contains($item,'email')){
                $obj->pattern  = "(\S)+@(\S)+\.(\S){2,5}";
            }elseif(str_contains($item,'phone')){
                $obj->pattern  = "^\d{11}$";
            }elseif(str_contains($item,'name')){
                $obj->pattern  = "[a-zA-Z\s]+";
            }elseif(str_contains($item,'imei')){
                $obj->pattern  = "^35\d{13}$";
            }else{
                $obj->pattern  = ".+";
            }

            return $obj;
        },$cols);
        return \Response::json($cols);
	}

    /**
     * Store a newly created resource in storage.
     *
     * @param TicketDataConfigRequest $request
     * @return Response
     */
	public function store(TicketDataConfigRequest $request)
	{
        $column = $request->get('column_title');
        $column = Str::slug($column,'_');

        Schema::table(GadgetSwapTicket::$tableName, function (Blueprint $table) use($column) {
                $table->string($column)->nullable();
        });
	}

    /**
     * Update the specified resource in storage.
     *
     * @param TicketDataConfigRequest $request
     * @return Response
     * @internal param int $id
     */
	public function update(TicketDataConfigRequest $request)
	{
        $oldColumn = $request->get('oldColumn');
        $newColumn = $request->get('newColumn');
        Schema::table(GadgetSwapTicket::$tableName, function (Blueprint $table) use($oldColumn,$newColumn) {
            $table->dropColumn($oldColumn);
            $table->string($newColumn)->nullable();
        });
	}

    /**
     * Remove the specified resource from storage.
     *
     * @param TicketDataConfigRequest $request
     * @return Response
     * @internal param int $id
     */
	public function destroy(TicketDataConfigRequest $request)
	{
        $column = $request->get('column');
        Schema::table(GadgetSwapTicket::$tableName, function (Blueprint $table) use($column) {
            $table->dropColumn($column);
        });

	}

    /**
     * @return array
     */
    public function getTableColumnsAsArray()
    {
        $cols = [];
        $colsObj = \DB::select("SHOW COLUMNS FROM ".GadgetSwapTicket::$tableName);

        foreach($colsObj as $obj){
            $cols[] = $obj->Field;
        }

        //$cols = get_object_vars(\DB::table(GadgetSwapTicket::$tableName)->first());
        //$cols = array_keys($cols);
        return $cols;
    }

}
