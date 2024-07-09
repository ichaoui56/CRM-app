<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class PdfController extends Controller
{

    public function index($id)
    {
        $ticket = Ticket::with(['contact.client', 'orders.parts', 'technician', 'laptop'])->findOrFail($id);

        return view('pdf', compact('ticket'));
    }

    public function generateTicketPdf($id)
    {
        try {
            $ticket = Ticket::with(['contact.client', 'orders.parts', 'technician', 'laptop'])->findOrFail($id);

            Log::info('Ticket ID:', ['id' => $id]);
            Log::info('Ticket data:', ['ticket' => $ticket]);

            $pdf = PDF::loadView('pdf', compact('ticket'));

            ini_set('memory_limit', '256M');

            return $pdf->stream('ticket.pdf');
        } catch (\Exception $e) {
            Log::error('PDF generation failed:', ['error' => $e->getMessage()]);
            return back()->withErrors('PDF generation failed. Please try again.');
        }
    }

    public function generateOrderPdf($id)
    {
        try {
            $order = Order::with(['parts', 'ticket','technician'])->findOrFail($id);

            Log::info('Order ID:', ['id' => $id]);
            Log::info('Order data:', ['order' => $order]);

            $pdf = PDF::loadView('orderPdf', compact('order'));

            ini_set('memory_limit', '256M');

            return $pdf->stream('order.pdf');
        } catch (\Exception $e) {
            Log::error('PDF generation failed:', ['error' => $e->getMessage()]);
            return back()->withErrors('PDF generation failed. Please try again.');
        }
    }
}
