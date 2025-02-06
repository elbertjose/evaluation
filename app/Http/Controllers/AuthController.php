<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;
    public function signin(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Credenciales incorrectas', 401);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return $this->success([
            'id' => $user->id ?? '',
            'name' => $user->name ?? '',
            'email' => $user->email ?? '',
            'access_token' => $token ?? '',
        ], 'Login successful');
    }
}

