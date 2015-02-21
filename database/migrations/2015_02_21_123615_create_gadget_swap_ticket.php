<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGadgetSwapTicket extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gadget_swap_tickets', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('customer_last_name');
            $table->string('customer_first_name');
            $table->string('customer_phone_number');
            $table->string('customer_email');
            $table->string('customer_device_imei');
            $table->string('hashcode')->unique();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gadget_swap_tickets');
	}

}
