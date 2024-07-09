<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contact;
use App\Models\Laptop;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::with(['contact', 'laptop', 'technician'])
        ->latest() 
        ->get();
        return response()->json($tickets);
    }

    public function show($id)
    {
        $ticket = Ticket::with(['contact.client', 'laptop', 'technician','orders.parts'])->findOrFail($id);
        return response()->json($ticket);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function addTicket(Request $request)
    {
        $validated = $request->validate([
            'clientName' => 'required|string',
            'clientAddress' => 'required|string',
            'clientPhone' => 'required|string',
            'contactName' => 'required|string',
            'contactEmail' => 'required|email',
            'contactPhone' => 'required|string',
            'clientCity' => 'required|string',
            'clientCountry' => 'required|string',
            'modelName' => 'required|string',
            'tagNo' => 'required|string',
            'modelNo' => 'required|string',
            'technicianName' => 'required|string',
            'serviceType' => 'required|string',
            'comment' => 'required|string',
            'problemDescription' => 'required|string',
        ]);

        $client = Client::create([
            'name' => $validated['clientName'],
            'address' => $validated['clientAddress'],
            'phone' => $validated['clientPhone'],
        ]);

        $contact = Contact::create([
            'client_id' => $client->id,
            'name' => $validated['contactName'],
            'phone' => $validated['contactPhone'],
            'email' => $validated['contactEmail'],
            'city' => $validated['clientCity'],
            'country' => $validated['clientCountry'],
        ]);

        $laptop = Laptop::create([
            'client_id' => $client->id,
            'technician_id' => $request->technicianName,
            'tag' => $validated['tagNo'],
            'model_number' => $validated['modelNo'],
            'comment' => $validated['comment'],
            'model_name' => $validated['modelName'],
        ]);

        $randomNumber = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
        $cityPrefix = strtoupper(substr($validated['clientCity'], 0, 2));
        $ticketId = $cityPrefix . $randomNumber;

        $ticket = Ticket::create([
            'id' => $ticketId,
            'contact_id' => $contact->id,
            'laptop_id' => $laptop->id,
            'technician_id' => $request->technicianName,
            'service_type' => $validated['serviceType'],
            'problem_description' => $validated['problemDescription'],
            'status' => 'created',
        ]);

        return response()->json(['message' => 'Ticket added successfully!', 'ticket' => $ticket], 201);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
    
        // Update the ticket attributes
        $ticket->update($request->only([
            'status'
        ]));
    
        // Check status to update corresponding dates
        if ($request->has('status')) {
            $status = $request->input('status');
    
            // Update diagnostic_date
            if ($status === 'diagnostic' && !$ticket->diagnostic_date) {
                $ticket->diagnostic_date = now();
            }
    
            // Update preparation_date
            if ($status === 'in_repair' && !$ticket->preparation_date) {
                $ticket->preparation_date = now();
            }
    
            // Update finished_date
            if ($status === 'finished' && !$ticket->finished_date) {
                $ticket->finished_date = now();
            }
    
            // Save the ticket after updating dates
            $ticket->save();
        }
    
        return response()->json($ticket);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
