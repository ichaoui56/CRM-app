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
        $orders = Order::with(['parts', 'technician'])
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'diagnostic_content' => 'nullable|string|max:255',
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
            'diagnostic_content' => $request->diagnostic_content,
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
        // Validation rules
        $validator = Validator::make($request->all(), [
            'diagnostic_content' => 'nullable|string|max:255',
            'arrived_at' => 'nullable|date',
            'status' => 'nullable|string|in:ordered,arrived', // Adjust status values as needed
            'ticket_id' => 'nullable|string|exists:tickets,id', // Validate ticket_id existence
            'technician_id' => 'nullable|integer|exists:users,id', // Validate technician_id existence
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the order by ID
        $order = Order::findOrFail($id);

        // Update order fields
        $order->fill([
            'diagnostic_content' => $request->input('diagnostic_content', $order->diagnostic_content),
            'arrived_at' => $request->input('arrived_at', $order->arrived_at),
            'status' => $request->input('status', $order->status),
            'ticket_id' => $request->input('ticket_id', $order->ticket_id),
            'technician_id' => $request->input('technician_id', $order->technician_id),
        ]);
        
        if ($request->has('status') && $request->input('status') === 'arrived') {
            // Update arrived_at only if it's not already set
            if (!$order->arrived_at) {
                $order->arrived_at = now(); // Set current timestamp as arrived_at
            }
        }
        // Save the updated order
        $order->save();

        // Return response
        return response()->json(['order' => $order]); // Load fresh order data with parts
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the order by ID
        $order = Order::findOrFail($id);

        // Detach parts associated with the order
        $order->parts()->detach();

        // Delete the order
        $order->delete();

        // Return success response
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
