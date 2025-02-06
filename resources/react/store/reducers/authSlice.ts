import type { PayloadAction } from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Login, User} from "../../types";
import {authUser} from "../../services/auth";

interface AuthUser {
    id: string,
    name: string,
    access_token: string
}

const initialData: AuthUser = {
    id: '',
    name: '',
    access_token: ''
}

export interface AuthState {
    currentAuthUser: AuthUser
    loading: boolean,
    error: string | null,
}

const initialState: AuthState = {
    currentAuthUser: initialData,
    loading: false,
    error: null,
}

export const authUserAction = createAsyncThunk('auth/signin', async (auth: Login, { rejectWithValue }) => {
    try {
        const response = await authUser(auth);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Error al actualizar el usuario');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentAuthUser = initialData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(authUserAction.fulfilled, (state, action: PayloadAction<AuthUser>) => {
                state.loading = false;
                state.currentAuthUser = action.payload;
            })
            .addCase(authUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
