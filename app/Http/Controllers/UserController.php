<?php

namespace App\Http\Controllers;

use App\Contracts\UserRepositoryContract;
use App\Http\Requests\Users\CreateRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

/**
 * @group Gestión de Usuarios
 *
 * Endpoints para administrar usuarios en el sistema.
 */
class UserController extends Controller
{
    use ApiResponse;

    protected $userRepository;

    public function __construct(UserRepositoryContract $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Obtener todos los usuarios
     *
     * Retorna una lista de todos los usuarios registrados en el sistema.
     *
     * @response 200 {
     *   "status": "success",
     *   "data": [
     *     {
     *       "id": 1,
     *       "name": "John Doe",
     *       "email": "johndoe@example.com",
     *       "created_at": "2024-02-06T12:00:00Z"
     *     }
     *   ]
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = $this->userRepository->all();
        return $this->success($users);
    }

    /**
     * Obtener un usuario por ID
     *
     * Devuelve la información de un usuario específico.
     *
     * @urlParam id integer required El ID del usuario. Ejemplo: 1
     *
     * @response 200 {
     *   "status": "success",
     *   "data": {
     *     "id": 1,
     *     "name": "John Doe",
     *     "email": "johndoe@example.com",
     *     "created_at": "2024-02-06T12:00:00Z"
     *   }
     * }
     *
     * @response 404 {
     *   "status": "error",
     *   "message": "User not found"
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = $this->userRepository->find($id);
            return $this->success($user);
        } catch (\Exception $e) {
            return $this->notFound('User not found');
        }
    }

    /**
     * Crear un nuevo usuario
     *
     * Crea un usuario con los datos proporcionados.
     *
     * @bodyParam name string required El nombre del usuario. Ejemplo: John Doe
     * @bodyParam email string required El correo del usuario. Ejemplo: johndoe@example.com
     * @bodyParam password string required La contraseña del usuario. Ejemplo: secret123
     *
     * @response 201 {
     *   "status": "success",
     *   "message": "User created successfully",
     *   "data": {
     *     "id": 2,
     *     "name": "John Doe",
     *     "email": "johndoe@example.com",
     *     "created_at": "2024-02-06T12:00:00Z"
     *   }
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateRequest $request)
    {
        $user = $this->userRepository->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        return $this->success($user, 'User created successfully', Response::HTTP_CREATED);
    }

    /**
     * Actualizar un usuario
     *
     * Modifica la información de un usuario existente.
     *
     * @urlParam id integer required El ID del usuario a actualizar. Ejemplo: 1
     * @bodyParam name string El nuevo nombre del usuario. Ejemplo: Jane Doe
     * @bodyParam email string El nuevo correo del usuario. Ejemplo: janedoe@example.com
     * @bodyParam password string La nueva contraseña del usuario. (Opcional) Ejemplo: newpassword123
     *
     * @response 200 {
     *   "status": "success",
     *   "message": "User updated successfully",
     *   "data": {
     *     "id": 1,
     *     "name": "Jane Doe",
     *     "email": "janedoe@example.com",
     *     "updated_at": "2024-02-06T12:30:00Z"
     *   }
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, $id)
    {
        $userData = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ];

        if ($request->has('password')) {
            $userData['password'] = Hash::make($request->input('password'));
        }

        $user = $this->userRepository->update($id, $userData);

        return $this->success($user, 'User updated successfully');
    }

    /**
     * Eliminar un usuario
     *
     * Elimina un usuario existente del sistema.
     *
     * @urlParam id integer required El ID del usuario a eliminar. Ejemplo: 1
     *
     * @response 200 {
     *   "status": "success",
     *   "message": "User deleted successfully"
     *   "data" => {}
     * }
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $this->userRepository->delete($id);
        return $this->deleted('User deleted successfully');
    }
}
