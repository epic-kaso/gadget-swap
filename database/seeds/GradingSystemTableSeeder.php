<?php
use Illuminate\Database\Seeder;
use SupergeeksGadgetSwap\GradingSystem;

/**
 * Created by PhpStorm.
 * User: Ak
 * Date: 2/21/2015
 * Time: 11:21 PM
 */
class GradingSystemTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('grading_systems')->delete();

        $data = [
            'touchScreen' => ['rating' => '', 'weight' => 0.625],
            'lcdScreen' => ['rating' => '', 'weight' => 0.625],
            'deviceCasing' => ['rating' => '', 'weight' => 0.625],
            'deviceKeypad' => ['rating' => '', 'weight' => 0.25],
            'deviceCamera' => ['rating' => '', 'weight' => 0.25],
            'deviceEarPiece' => ['rating' => '', 'weight' => 0.125],
            'deviceSpeaker' => ['rating' => '', 'weight' => 0.125],
            'deviceEarphoneJack' => ['rating' => '', 'weight' => 0.125],
            'deviceChargingPort' => ['rating' => '', 'weight' => 0.25]
        ];

        foreach($data as $key => $value){
            $item = new GradingSystem();
            $item->title = $key;
            $item->weight = $value['weight'];
            $item->save();
        }
    }
}