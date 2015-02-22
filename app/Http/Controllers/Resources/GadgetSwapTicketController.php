<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use Input;
use SupergeeksGadgetSwap\GadgetSwapTicket;
use SupergeeksGadgetSwap\Http\Controllers\Controller;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Requests\TicketRequest;

class GadgetSwapTicketController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $limit = Input::get('limit', null);

        if (is_null($limit)) {

            return GadgetSwapTicket::with('gadget.gadget_maker', 'size', 'network')->get();
        } else {
            return GadgetSwapTicket::with('gadget.gadget_maker', 'size', 'network')->take($limit)->latest()->get();
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(TicketRequest $request)
    {
        $data = Input::only(
            [
                'customer_first_name',
                'customer_last_name',
                'customer_phone_number',
                'customer_device_imei',
                'customer_email'
            ]
        );

        $ticket = GadgetSwapTicket::create($data);

        return $ticket;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        return GadgetSwapTicket::with('gadget.gadget_maker', 'size', 'network')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        $keys = [
            'customer_first_name',
            'customer_last_name',
            'customer_phone_number',
            'customer_device_imei',
            'customer_email',
            'device_grade',
            'gadget_id',
            'network_id',
            'size_id',
            'reward'
        ];
        $data = Input::only(
            $keys
        );

        $ticket = GadgetSwapTicket::find($id);

        foreach ($keys as $k) {
            $ticket->{$k} = $data[$k];
        }

        $ticket->save();

        return $ticket;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        return GadgetSwapTicket::destroy($id);
    }

}
