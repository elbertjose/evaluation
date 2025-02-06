<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * Respuesta exitosa de la API con datos.
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function success($data = [], $message = 'Request successful', $statusCode = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    /**
     * Respuesta de error de la API.
     *
     * @param string $message
     * @param int $statusCode
     * @param mixed $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function error($message = 'An error occurred', $statusCode = 500, $data = [])
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    /**
     * Respuesta de validación fallida.
     *
     * @param $errors
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function validationError($errors, $statusCode = 422)
    {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'data' => $errors
        ], $statusCode);
    }

    /**
     * Respuesta de no encontrado.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function notFound($message = 'Resource not found', $statusCode = 404)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'data' => []
        ], $statusCode);
    }

    /**
     * Respuesta de eliminación exitosa.
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleted($message = 'Resource deleted successfully', $statusCode = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => []
        ], $statusCode);
    }
}

