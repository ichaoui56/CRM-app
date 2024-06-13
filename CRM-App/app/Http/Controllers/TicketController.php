<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Laptop;
use App\Models\Ticket;
use App\Models\Contact;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'model_name' => $validated['modelName'],
        ]);

        $ticket = Ticket::create([
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
    public function show(string $id)
    {
        //
    }

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
