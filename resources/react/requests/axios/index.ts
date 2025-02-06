import axios, {AxiosHeaders} from 'axios';
import {store} from "../../store";
// @ts-ignore
const apiURL = import.meta.env.VITE_APP_URL;

// Crear una instancia de Axios
const axiosInstance = axios.create({
    baseURL: apiURL+'/api/',  // Reemplaza con tu URL base
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const domToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!config.headers) {
        config.headers = new AxiosHeaders();
    }

    // Obtener el token de autenticación desde el store
    const authToken = store.getState().auth.currentAuthUser.access_token;

    // Si el token está disponible, lo agregamos a los encabezados
    if (authToken) {
        config.headers.set('Authorization', `Bearer ${authToken}`);
    }

    config.headers.set('X-CSRF-TOKEN', domToken || undefined);

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar las respuestas de la API de la forma que mencionas
axiosInstance.interceptors.response.use(
    (response) => {
        // Aquí validamos que la respuesta tiene el formato esperado
        if (response.data.status === 'success') {
            return response.data;  // Devolvemos solo los datos
        } else {
            // Si el status no es 'success', lanzamos un error
            return Promise.reject(response.data.message);
        }
    },
    (error) => {
        // En caso de error, manejamos la respuesta con un mensaje genérico
        return Promise.reject(error.response?.data?.message || 'Algo salió mal');
    }
);

export default axiosInstance;
