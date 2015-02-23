<?php namespace SupergeeksGadgetSwap\Http\Requests;


class TicketRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
        return true;//Auth::check();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
        if ($this->getMethod() == strtolower('get')) {
            return [];
        }

		return [
			'customer_last_name' => 'required|alpha_dash',
			'customer_first_name' => 'required|alpha_dash',
			'customer_email' => 'required|email',
			'customer_phone_number' => 'required|digits:11,14',
            'customer_device_imei' => 'required|digits:15',
		];
	}

}
