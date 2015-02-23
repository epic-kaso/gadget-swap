<?php namespace SupergeeksGadgetSwap\Http\Requests;

use SupergeeksGadgetSwap\Http\Requests\Request;

class AdviserRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
        if($this->getMethod() == strtolower('post')) {
            return \Auth::check() && \Auth::user()->isAdmin();
        }else{
            return \Auth::check();
        }
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
        if($this->getMethod() == strtolower('post')){
            return [
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed',
                'last_name' => 'required',
                'first_name' => 'required',
                'phone_number' => 'required|digits:10'
            ];
        }

        if($this->getMethod() == strtolower('put') || $this->getMethod() == strtolower('patch')  ){
            return [
                'password' => 'confirmed',
                'last_name' => '',
                'first_name' => '',
                'phone_number' => 'digits:10'
            ];
        }

        return [];
	}

}
