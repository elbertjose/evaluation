// Obtener todos los usuarios
import axiosInstance from "../../requests/axios";

export const fetchUsers = async () => {
    try {
        return await axiosInstance.get('/users');
    } catch (error) {
        throw new Error(error as string);
    }
};

// Crear un nuevo usuario
export const createUser = async (user: { name: string; email: string; password: string }) => {
    try {
        return await axiosInstance.post('/users', user);
    } catch (error) {
        throw new Error(error as string);
    }
};

// Actualizar un usuario
export const updateUser = async (user: { id: string; name: string; email: string; password: string }) => {
    try {
        return await axiosInstance.put(`/users/${user.id}`, user);
    } catch (error) {
        throw new Error(error as string);
    }
};

// Eliminar un usuario
export const deleteUser = async (id: string) => {
    try {
        return await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
        throw new Error(error as string);
    }
};
