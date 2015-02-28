<?php namespace SupergeeksGadgetSwap\Commands;

use Illuminate\Database\Eloquent\Collection;
use SupergeeksGadgetSwap\Commands\Command;

use Illuminate\Contracts\Bus\SelfHandling;
use SupergeeksGadgetSwap\Gadget;
use SupergeeksGadgetSwap\GadgetMaker;
use SupergeeksGadgetSwap\GadgetSwapTicket;
use SupergeeksGadgetSwap\Http\Requests\ImportExcelToTicket;
use SupergeeksGadgetSwap\Network;

class ImportTicketFromExcel extends Command implements SelfHandling {
    /**
     * @var ImportExcelToTicket
     */
    private $excelToTicket;

    /**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct(ImportExcelToTicket $excelToTicket )
	{
		//
        $this->excelToTicket = $excelToTicket;
    }

	/**
	 * Execute the command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
        $results = $this->excelToTicket->get();

        $successfulTickets = [];
        $failedRows = [];

        foreach($results as $result){
            $result->device_make_id = $this->figureOutDeviceMake($result->device_make);
            $result->device_model_id = $this->figureOutDeviceModel($result->device_model,$result->device_make_id);
            $result->network_id = $this->figureOutDeviceNetwork($result->network);
            $result->device_storage_size_id = $this->figureOutDeviceStorageSize($result->device_storage_size,$result->device_model_id);
            $ticket = $this->createTicket($result);

            if(!is_null($ticket))
                $successfulTickets[] = $ticket;
            else
                $failedRows[] = $result;
        }
        return ['success' => $successfulTickets,'failed' => $failedRows];
	}

    private function figureOutDeviceMake($device_make)
    {
        $gadget = GadgetMaker::where('name','like',"%".$device_make."%")->first();
        return is_null($gadget) ? null : $gadget->id;
    }

    private function figureOutDeviceModel($device_model,$device_make_id)
    {
        $gadget = Gadget::where('model','like',"%".$device_model."%");
        if(is_numeric($device_make_id)){
            $gadget = $gadget->where('gadget_maker_id',$device_make_id);
        }
        $gadget = $gadget->first();
        return is_null($gadget) ? null : $gadget->id;
    }

    private function createTicket($result)
    {
        $ticket = new \stdClass();
        $ticket->customer_last_name = $result->last_name;
        $ticket->customer_first_name = $result->first_name;
        $ticket->customer_phone_number = $result->phone_number;
        $ticket->customer_email = $result->email;
        $ticket->customer_device_imei = $result->device_imei;
        $ticket->gadget_id = $result->device_model_id;
        $ticket->size_id = $result->device_storage_size_id;
        $ticket->network_id = $result->network_id;
        $ticket->device_grade = strtoupper($result->device_grade);
        $ticket->reward = $result->reward;
        $ticket->discount_voucher_code = $result->discount_voucher;
        $ticket->port_to_airtel = $this->getBoolFromYesOrNo($result->port_to_airtel);

        $ticket = GadgetSwapTicket::firstOrCreate(get_object_vars($ticket));
        return $ticket;
    }

    private function figureOutDeviceNetwork($network)
    {
        $networkModel  = Network::where('name','like','%'.$network.'%')->first();
        return is_null($networkModel) ? null : $networkModel->id;
    }

    private function figureOutDeviceStorageSize($device_storage_size,$model_id)
    {
        if(is_numeric($model_id)){
            $sizes = Gadget::with('sizes')->find($model_id)->sizes->toArray();
            $response = array_first($sizes,function($item) use($device_storage_size){
                return preg_match('/^'.strtolower($item['value']).'/',strtolower($device_storage_size)) == 1 ? true : false;
            });

            return is_null($response) && isset($sizes['STANDARD']) ? $sizes['STANDARD']['id'] : $response['id'];
        }else{
            return null;
        }
    }

    private function getBoolFromYesOrNo($port_to_airtel)
    {
        if(strtolower($port_to_airtel) == 'yes')
            return true;
        return false;
    }

}
