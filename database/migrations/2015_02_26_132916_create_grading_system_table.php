<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGradingSystemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */

    /*
     * touchScreen: {rating: '', weight: 0.625},
                lcdScreen: {rating: '', weight: 0.625},
                deviceCasing: {rating: '', weight: 0.625},
                deviceKeypad: {rating: '', weight: 0.25},
                deviceCamera: {rating: '', weight: 0.25},
                deviceEarPiece: {rating: '', weight: 0.125},
                deviceSpeaker: {rating: '', weight: 0.125},
                deviceEarphoneJack: {rating: '', weight: 0.125},
                deviceChargingPort: {rating: '', weight: 0.25}
     */
	public function up()
	{
		Schema::create('grading_systems', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('title');
            $table->string('weight');
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
		Schema::drop('grading_systems');
	}

}
