<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\User;
use App\Models\Order;
use App\Models\Client;
use App\Models\Laptop;
use App\Models\Ticket;
use App\Models\Contact;
use Illuminate\Http\Request;

class CountController extends Controller
{
    public function getCounts()
    {
        $counts = [
            'technicien' => User::count(),
            'orders' => Order::count(),
            'orders' => Part::count(),
            'laptops' => Laptop::count(),
            'contacts' => Contact::count(),
            'clients' => Client::count(),
            'tickets_created' => Ticket::count(),
            'tickets_with_diagnostic' => Ticket::where('status', 'diagnostic')->count(),
            'tickets_done' => Ticket::where('status', 'finished')->count(),
        ];

        return response()->json($counts);
    }
}
