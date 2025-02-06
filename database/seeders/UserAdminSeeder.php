<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdminSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear un usuario con ID 1
        $user = User::create([
            'id' => 1, // Asegúrate de especificar el ID manualmente
            'name' => 'Admin User',
            'email' => env('APP_ADMIN_EMAIL', 'admin'),
            'password' => Hash::make(env('APP_ADMIN_PASSWORD', 'admin@example.com')) // Asegúrate de usar una contraseña segura
        ]);

        // Generar un token para el usuario
        $token = $user->createToken('Admin Token')->plainTextToken;

        // Mostrar el token en la consola (opcional)
        $this->command->info("Token for user 1: $token");
    }

}
