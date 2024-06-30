<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class PdfController extends Controller
{
    public function generateTicketPdf($id)
    {
        try {
            $ticket = Ticket::with(['contact.client', 'orders.parts', 'technician', 'laptop'])->findOrFail($id);

            // Log ticket data for debugging
            Log::info('Ticket ID:', ['id' => $id]);
            Log::info('Ticket data:', ['ticket' => $ticket]);

            // Generate PDF
            $pdf = PDF::loadView('pdf', compact('ticket'));
            
            // Increase memory limit if needed
            ini_set('memory_limit', '256M'); // Adjust as needed

            return $pdf->download('ticket.pdf');
        } catch (\Exception $e) {
            Log::error('PDF generation failed:', ['error' => $e->getMessage()]);
            return back()->withErrors('PDF generation failed. Please try again.');
        }
    }
}