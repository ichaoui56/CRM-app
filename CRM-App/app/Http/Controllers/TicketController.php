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
        $tickets = Ticket::with(['contact', 'laptop', 'technician'])->get();

        return response()->json($tickets);
    }

    public function show($id)
    {
        $ticket = Ticket::with(['contact.client', 'laptop', 'technician'])->findOrFail($id);
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
            'status' => 'diagnostic',
        ]);

        return response()->json(['message' => 'Ticket added successfully!', 'ticket' => $ticket], 201);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
