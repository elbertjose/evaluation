<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('auth/signin', [AuthController::class, 'signin']);

Route::apiResource('users', \App\Http\Controllers\UserController::class)->middleware('auth:sanctum');
