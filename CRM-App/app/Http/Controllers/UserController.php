<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Log::info('Incoming request data:', ['params' => $request->all()]);
    
        $query = User::query();
    
        // Example sorting by last updated first
        $query->orderByDesc('updated_at');
    
        // Example sorting by last added first (assuming 'created_at' field exists)
        $query->orderByDesc('created_at');
    
        // Additional filtering based on request parameters if needed
        // if ($request->has('id')) {
        //     $query->where('id', $request->id);
        // }
    
        // if ($request->has('city')) {
        //     $query->where('city', $request->city);
        // }
    
        $perPage = $request->get('per_page', 5);
        $users = $query->paginate($perPage);
    
        return response()->json($users);
    }
    


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'password' => 'required|string|min:8|confirmed',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('images', 'public');
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'city' => $request->city,
            'current_address' => $request->address,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'profile_picture' => $profilePicturePath,
        ]);

        return response()->json(['user' => $user], 201);
    }
    /**
     * Display the specified resource.
     */

    public function getUser(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            // User is logged in
            return response()->json([
                'user' => $user,
                'message' => 'User is logged in.'
            ]);
        } else {
            // User is not logged in
            return response()->json([
                'message' => 'User is not logged in.'
            ], 401);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone_number' => 'required|string|max:15',
        'city' => 'required|string|max:255',
        'current_address' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
    ]);

    $user = User::findOrFail($id);
    $user->update($request->all());

    return response()->json(['user' => $user]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    
        return response()->json(['message' => 'User deleted successfully.']);
    }
    
}
