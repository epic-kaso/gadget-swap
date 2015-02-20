<?php namespace SupergeeksGadgetSwap;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
/**
 * Created by PhpStorm.
 * User: kaso
 * Date: 1/7/2015
 * Time: 2:26 PM
 */

    class BaseModel extends Model {

    protected $guarded = ['id'];
}