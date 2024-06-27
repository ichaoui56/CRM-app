<?php

use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;

require __DIR__ . '/auth.php';
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

 Route::middleware(['auth:sanctum'])->get('/authUser', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Route to get the list of users
    Route::get('/cities', function (Request $request) {
        return City::all();
    });

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/ticket/{id}', [TicketController::class, 'show']); // Route to fetch a specific ticket by ID

    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Other routes that require authentication
    Route::post('/addTicket', [TicketController::class, 'addTicket']);
    Route::get('/parts', [PartController::class, 'index']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::delete('/parts/{id}', [PartController::class, 'destroy']);
    Route::post('/part', [PartController::class, 'store']);
    Route::post('/user', [UserController::class, 'store']);
    Route::put('/parts/{id}', [PartController::class, 'update']);
});
