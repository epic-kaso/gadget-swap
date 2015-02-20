<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSwapUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('swap_users', function(Blueprint $table)
		{

			$table->increments('id');
            $table->string('phone');
            $table->string('device_make');
            $table->string('device_size');
            $table->string('device_network');
            $table->string('device_condition');
            $table->string('swap_location');
            $table->string('device_reward');
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
		Schema::drop('swap_users');
	}

}
