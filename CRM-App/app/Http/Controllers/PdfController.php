<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use Barryvdh\DomPDF\Facade as PDF;

class TicketController extends Controller
{
    public function generatePdf($id)
    {
        $ticket = Ticket::with(['contact', 'orders.parts', 'technician', 'laptop'])->findOrFail($id);

        $pdf = PDF::loadView('pdf.ticket', compact('ticket'));

        return $pdf->download('ticket.pdf');
    }
}
