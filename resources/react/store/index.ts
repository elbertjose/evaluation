import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {encryptTransform} from "./encrypt";
import authSlice from "./reducers/authSlice"; // Almacenamiento local

// @ts-ignore
const keyAPP = import.meta.env.APP_KEY;


// Configurar el encriptador para los datos del persist
const encryptor = encryptTransform({
    secretKey: keyAPP,
    onError: (error) => console.error('Error encriptando el estado:', error),
});

// Configuración de persistencia
const persistConfig = {
    key: 'root', // Nombre del almacenamiento
    storage,
    transforms: [encryptor],
};

//  Reducer persistido
const persistedReducer = persistReducer(persistConfig, usersSlice);
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// Configuración del Store con Redux Persist
export const store = configureStore({
    reducer: {
        users: persistedReducer, // Ahora el reducer de usuarios está persistido
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Deshabilita warnings de serialización en Redux Persist
        }),
});

// Persister para la rehidratación del estado
export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
