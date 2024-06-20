<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Attempt to authenticate the user using the credentials in the LoginRequest
        $request->authenticate();

        // If authentication is successful, regenerate the session to prevent session fixation attacks
        $request->session()->regenerate();

        // Retrieve the authenticated user
        $user = $request->user();

        // Generate a token for the authenticated user using Sanctum (if you're using Laravel Sanctum)
        $token = $user->createToken('auth-token')->plainTextToken;

        // Optionally, you can return the token in the response if needed
        return response()->json(['token' => $token]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): \Illuminate\Http\Response
    {
        // Logout the authenticated user
        Auth::guard('web')->logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
