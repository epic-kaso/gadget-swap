<?php namespace SupergeeksGadgetSwap\Http\Controllers\Resources;

use Input;
use SupergeeksGadgetSwap\GadgetSwapTicket;
use SupergeeksGadgetSwap\Http\Requests;
use SupergeeksGadgetSwap\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MailerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        if (!Input::has('ticket_id')) {
            return null;
        }
        $ticket = GadgetSwapTicket::with('gadget.gadget_maker', 'size', 'network')->find(Input::get('ticket_id'));

        \Mail::queue('emails.ticket', ['ticket' => $ticket], function ($message) use ($ticket) {
            $message->to('swap@supergeeks.com.ng')
                ->subject('New GadgetSwap Ticket: ' . $ticket->hashcode);
        });

        return \Response::json(['sent']);
    }

}
