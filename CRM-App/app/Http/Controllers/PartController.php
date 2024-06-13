<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4|max:255|unique:parts,name',
            'part_description' => 'required|string',
            'part_picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp,avif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $part = new Part();
        $part->name = $request->name;
        $part->part_description = $request->part_description;

        if ($request->hasFile('part_picture')) {
            $image = $request->file('part_picture');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $part->part_picture = $imageName;
        }

        $part->save();

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
        // Log the request to see what's being received
        \Log::info('Request data:', $request->all());

        $part = Part::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4|max:255',
            'part_description' => 'required|string',
            'part_picture' => 'nullable|string', // Validate the Base64 string
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $part->name = $request->input('name');
        $part->part_description = $request->input('part_description');

        if ($request->filled('part_picture')) {
            // Handle the Base64 image
            $image = $request->input('part_picture');
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            $imageName = time() . '.png'; // Or '.jpg' based on the input
            \File::put(public_path('/images') . '/' . $imageName, base64_decode($image));

            // Save the file path to the database
            $part->part_picture = $imageName;
        }
        $part->save();

        return response()->json(['part' => $part], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $part = Part::findOrFail($id);
        $part->delete();

        return response()->json(null, 204);
    }
}
