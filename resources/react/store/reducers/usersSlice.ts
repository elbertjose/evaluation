import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../services/users';

// Definimos el estado inicial
interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

// Estado inicial
const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

// Acciones asincrónicas con manejo de errores
export const fetchUsersAction = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUsers();
        return response.data; // 🔹 Extraemos solo `data`
    } catch (error: any) {
        return rejectWithValue(error.message || 'Error al cargar los usuarios');
    }
});

export const createUserAction = createAsyncThunk('users/createUser', async (user: User, { rejectWithValue }) => {
    try {
        const response = await createUser(user);
        return response.data; // 🔹 Extraemos solo `data`
    } catch (error: any) {
        return rejectWithValue(error.message || 'Error al crear el usuario');
    }
});

export const updateUserAction = createAsyncThunk('users/updateUser', async (user: User, { rejectWithValue }) => {
    try {
        const response = await updateUser(user);
        return response.data; // 🔹 Extraemos solo `data`
    } catch (error: any) {
        return rejectWithValue(error.message || 'Error al actualizar el usuario');
    }
});

export const deleteUserAction = createAsyncThunk('users/deleteUser', async (id: string, { rejectWithValue }) => {
    try {
        await deleteUser(id);
        return id; // No hay `data`, solo devolvemos el ID
    } catch (error: any) {
        return rejectWithValue(error.message || 'Error al eliminar el usuario');
    }
});

// Slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsersAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersAction.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create User
            .addCase(createUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUserAction.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update User
            .addCase(updateUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserAction.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete User
            .addCase(deleteUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;
