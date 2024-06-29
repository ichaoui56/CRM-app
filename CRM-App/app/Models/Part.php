<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['name','part_description','part_picture'];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_part');
    }
}