<?php

namespace App\Http\Requests\Users;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ApiResponse;
use Illuminate\Validation\ValidationException;

class UpdateRequest extends FormRequest
{
    use ApiResponse;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cambiar a 'true' si quieres permitir todas las solicitudes
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $this->route('user'),
            'password' => 'nullable|string|min:6|confirmed',
        ];
    }

    /**
     * Si la validación falla, personaliza la respuesta de error.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        // Llamamos a la respuesta estandarizada del trait
        throw new ValidationException($validator, $this->validationError($validator->errors()));
    }
}
