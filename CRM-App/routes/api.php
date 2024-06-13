<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/user', [UserController::class, 'store']);
Route::post('/part', [PartController::class, 'store']);
Route::post('/addTicket', [TicketController::class, 'addTicket']);


Route::post('/login', [AuthController::class, 'login']);

Route::get('/authUser', [UserController::class, 'getUser']);
Route::get('/parts', [PartController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);
Route::delete('/parts/{id}', [PartController::class, 'destroy']);

Route::put('/parts/{id}', [PartController::class, 'update']);

Route::middleware(['auth:api'])->group(function () {
});