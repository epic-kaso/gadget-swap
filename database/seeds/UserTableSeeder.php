<?php
use Illuminate\Database\Seeder;
use SupergeeksGadgetSwap\User;

/**
 * Created by PhpStorm.
 * User: Ak
 * Date: 2/21/2015
 * Time: 11:21 PM
 */
class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();

        $admin = new User();
        $admin->email = 'admin@admin.com';
        $admin->password = Hash::make('password');
        $admin->role = 'admin,adviser';
        $admin->save();

        $admin = new User();
        $admin->email = 'adviser@adviser.com';
        $admin->password = Hash::make('password');
        $admin->role = 'adviser';
        $admin->save();
    }
}