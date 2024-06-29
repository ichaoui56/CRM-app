<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
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

    public function store(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'dps_number' => 'nullable|string|max:255',
            'ups_tracking_number' => 'nullable|string|max:255',
            'arrived_at' => 'nullable|date',
            'ticket_id' => 'required|string|exists:tickets,id',
            'part_ids' => 'required|array',
            'part_ids.*' => 'exists:parts,id',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the order
        $order = Order::create([
            'dps_number' => $request->dps_number,
            'ups_tracking_number' => $request->ups_tracking_number,
            'ordered_at' => now(),
            'arrived_at' => $request->arrived_at,
            'status' => 'ordered',
            'ticket_id' => $request->ticket_id,
            'technician_id' => Auth::id(),
        ]);

        // Attach parts to the order
        $order->parts()->attach($request->part_ids);

        // Return response
        return response()->json(['order' => $order->load('parts')], 201);
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
