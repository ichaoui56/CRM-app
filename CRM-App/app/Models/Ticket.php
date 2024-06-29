<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    public $incrementing = false; // Disable auto-incrementing
    protected $primaryKey = 'id'; // Specify 'ticket_id' as primary key
    protected $keyType = 'string'; // Ensure 'ticket_id' is treated as a string

    protected $fillable = [
        'id',
        'contact_id',
        'laptop_id',
        'technician_id',
        'service_type',
        'problem_description',
        'status',
        'diagnostic_date',
        'preparation_date',
        'finished_date',
    ];

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
