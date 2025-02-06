import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput } from "flowbite-react";

import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../../../hooks/users";
import {authUserAction} from "../../../store/reducers/authSlice";
import {Login} from "../../../types";


const AuthSigninForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<Login>();

    const onSubmit = async (data: Login) => {
        try {
            // Intentar autenticar al usuario
            const resultAction = await dispatch(authUserAction(data)); // Aquí pasas los datos para el login
            if (authUserAction.fulfilled.match(resultAction)) {
                // Redirigir al usuario a la página principal (o a cualquier otra página)
                navigate('/users'); // Cambia la ruta según sea necesario
            }
            if(authUserAction.rejected.match(resultAction)) {
                setError(resultAction.payload as string);
            }
        } catch (err) {
            setError('Error de autenticación. Intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
            <div>
                <label className="block">Email</label>
                <TextInput {...register('email', { required: true })} type="email" className="w-full" />
            </div>
            <div>
                <label className="block">Contraseña</label>
                <TextInput {...register('password', { required: true })} type="password" className="w-full" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="bg-blue-500 text-white rounded-md my-2">
                Iniciar Sesión
            </Button>
        </form>
    );
};

export default AuthSigninForm;
