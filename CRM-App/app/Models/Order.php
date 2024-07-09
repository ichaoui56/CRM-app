<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'diagnostic_content', 'ordered_at', 'arrived_at', 'status',
        'ticket_id', 'technician_id'
    ];

    protected $dates = ['ordered_at', 'arrived_at'];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function parts()
    {
        return $this->belongsToMany(Part::class, 'order_part');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
