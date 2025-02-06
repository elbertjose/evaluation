<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

it('can create a user', function () {
    $userData = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'secretpassword',
        'password_confirmation' => 'secretpassword',
    ];

    // Realizamos una petición POST a la API para crear un nuevo usuario
    $response = $this->postJson('/api/users', $userData);

    // Verificamos que la respuesta sea exitosa
    $response->assertStatus(Response::HTTP_CREATED);
    $response->assertJson([
        'status' => 'success',
        'message' => 'User created successfully',
    ]);
    $response->assertJsonStructure([
        'status',
        'message',
        'data' => ['id', 'name', 'email'],
    ]);
});

it('can update a user', function () {
    // Creamos un usuario de prueba
    $user = User::factory()->create();

    $userData = [
        'name' => 'John Updated',
        'email' => 'johnupdated@example.com',
        'password' => 'newpassword'
    ];

    // Realizamos una petición PUT a la API para actualizar al usuario
    $response = $this->putJson("/api/users/{$user->id}", $userData);

    // Verificamos que la respuesta sea exitosa
    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'status' => 'success',
        'message' => 'User updated successfully',
    ]);
    $response->assertJsonFragment([
        'name' => 'John Updated',
        'email' => 'johnupdated@example.com',
    ]);
});

it('can delete a user', function () {
    // Creamos un usuario de prueba
    $user = User::factory()->create();

    // Realizamos una petición DELETE a la API para eliminar al usuario
    $response = $this->deleteJson("/api/users/{$user->id}");

    // Verificamos que la respuesta sea exitosa
    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'status' => 'success',
        'message' => 'User deleted successfully',
    ]);

    // Verificamos que el usuario fue realmente eliminado
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

it('can list all users', function () {
    // Creamos un usuario de prueba
    User::factory()->create();

    // Realizamos una petición GET a la API para obtener la lista de usuarios
    $response = $this->getJson('/api/users');

    // Verificamos que la respuesta sea exitosa
    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'status' => 'success',
        'message' => 'Request successful',
    ]);
    $response->assertJsonStructure([
        'status',
        'message',
        'data' => [['id', 'name', 'email']],
    ]);
});

it('can show a specific user', function () {
    // Creamos un usuario de prueba
    $user = User::factory()->create();

    // Realizamos una petición GET a la API para obtener los detalles del usuario
    $response = $this->getJson("/api/users/{$user->id}");

    // Verificamos que la respuesta sea exitosa
    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'status' => 'success',
        'message' => 'Request successful',
    ]);
    $response->assertJsonFragment([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
    ]);
});

