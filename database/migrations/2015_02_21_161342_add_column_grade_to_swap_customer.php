<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddColumnGradeToSwapCustomer extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gadget_swap_tickets', function (Blueprint $table) {
            $table->string('device_grade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('gadget_swap_tickets', function (Blueprint $table) {
            $table->dropColumn('device_grade');
        });
    }

}
