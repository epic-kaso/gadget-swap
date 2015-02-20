<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GadgetsTableCreate extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gadgets', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('model');
            $table->integer('gadget_maker_id');
            $table->string('image_url');
            $table->string('slug');
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
		Schema::drop('gadgets');
	}

}
