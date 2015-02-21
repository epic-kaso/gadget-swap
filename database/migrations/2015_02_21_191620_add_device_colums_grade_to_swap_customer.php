<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddDeviceColumsGradeToSwapCustomer extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gadget_swap_tickets', function (Blueprint $table) {
            $table->integer('gadget_id');
            $table->integer('size_id');
            $table->integer('network_id');
            $table->text('reward');
            $table->boolean('port_to_airtel')->default(false);
            $table->string('discount_voucher_code')->nullable();

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
            $table->dropColumn(['gadget_id', 'size_id', 'network_id', 'reward', 'port_to_airtel', 'discount_voucher_code']);
        });
    }

}
