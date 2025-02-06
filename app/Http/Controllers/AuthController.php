<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * Iniciar sesión de usuario
     *
     * @group Autenticación
     * @unauthenticated
     *
     * @bodyParam email string required El correo del usuario.
     * @bodyParam password string required La contraseña del usuario.
     *
     * @response 200 scenario="Credenciales válidas" {
     *   "status": "success",
     *   "message": "Login successful",
     *   "data": {
     *     "id": 1,
     *     "name": "Admin User",
     *     "email": "admin@example.com",
     *     "access_token": "eyJ0eXAiOiJKV1QiLCJh..."
     *   }
     * }
     */
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

