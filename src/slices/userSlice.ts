import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/userService';
// import { isAuthenticated } from '../services/user.service';
import {  RootState } from '../store';
import { ILogin, IUser } from '../services/userService';
import { IError } from './common';

interface IAuthState {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    user: any
    error: IError | undefined;
}


export const loginUser = createAsyncThunk<IUser, ILogin, { rejectValue: IError }>
    ('users/login', async (loginData, { rejectWithValue }) => {
        try {
            const { username, password } = loginData;
            const response = await userService.login({username: username, password: password})
            return response
        }
        catch (err) {
            return rejectWithValue(err);
        }
    })

const user = userService.getUserData();

const initialState: IAuthState = {
    isLoggedIn: user ? true : false,
    isLoggingIn: false,
    user: user,
    error: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        errorCleanup: (state) => {
            state.error = undefined;
        },
        logout: (state) => {
            userService.logout();
            state.isLoggedIn = false;
            state.user = null;
            state.error = undefined;
        },

    },
    extraReducers: (builder) => {
        //login
        builder.addCase(loginUser.pending, (state, { payload }) => {
            state.isLoggingIn = true;
            state.isLoggedIn = false;
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.isLoggingIn = false;
            state.isLoggedIn = true;
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoggingIn = false;
            state.isLoggedIn = false;
            state.error = payload;
        })
    }

});

export const { logout, errorCleanup } = userSlice.actions;


export const selectIsLoginedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsLogginingIn = (state: RootState) => state.user.isLoggingIn;

export default userSlice.reducer;
