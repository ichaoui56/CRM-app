<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;

require __DIR__.'/auth.php';
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    // Route to get the list of users
    Route::get('/users', [UserController::class, 'index']);

    // Other routes that require authentication
    Route::post('/part', [PartController::class, 'store']);
    Route::post('/addTicket', [TicketController::class, 'addTicket']);
    Route::get('/authUser', [UserController::class, 'getUser']);
    Route::get('/parts', [PartController::class, 'index']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::delete('/parts/{id}', [PartController::class, 'destroy']);
    Route::put('/parts/{id}', [PartController::class, 'update']);
});