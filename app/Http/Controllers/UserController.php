<?php

namespace App\Http\Controllers;

use App\Contracts\UserRepositoryContract;
use App\Http\Requests\Users\CreateRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    use ApiResponse;

    protected $userRepository;

    public function __construct(UserRepositoryContract $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Mostrar todos los usuarios
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = $this->userRepository->all();
        return $this->success($users);
    }

    /**
     * Mostrar un usuario específico
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
     * Actualizar un usuario existente
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $this->userRepository->delete($id);
        return $this->deleted('User deleted successfully');
    }
}
