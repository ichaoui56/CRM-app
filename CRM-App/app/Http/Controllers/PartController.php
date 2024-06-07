<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Part::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        if ($request->has('created_at')) {
            $query->whereDate('created_at', $request->created_at);
        }

        $parts = $query->paginate(10);

        return response()->json($parts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'part_name' => 'required|string|min:4|max:255|unique:parts,name',
        ]);

        $part = Part::create([
            'name' => $request->part_name,
        ]);

        return response()->json(['part' => $part], 201);
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
