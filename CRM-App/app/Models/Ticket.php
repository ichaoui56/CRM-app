<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['contact_id', 'laptop_id', 'technician_id', 'service_type', 'problem_description', 'status'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function laptop()
    {
        return $this->belongsTo(Laptop::class);
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
