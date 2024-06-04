<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'phone'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function laptops()
    {
        return $this->hasMany(Laptop::class);
    }
}
