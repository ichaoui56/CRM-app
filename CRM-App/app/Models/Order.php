<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['ticket_id', 'part_id', 'technician_id', 'quantity', 'ups_tracking_number', 'ordered_at', 'arrived_at', 'status'];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function part()
    {
        return $this->belongsTo(Part::class);
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
