import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCookies, fetchAPI } from '../../utils/dataFetching';
import { failure, success } from './alertSlice';

const cookies = fetchCookies();

const initialState = {
    loggedIn: !!cookies['auth-uid'],
    user: cookies['auth-uid']
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (input, { dispatch, rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'POST',
                url: 'signup',
                body: input
            };

            const { data, message } = await fetchAPI(requestObject);
            dispatch(success(message));

            return data.user.id;
        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
            rejectWithValue(err);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'POST',
                url: 'login',
                body: { email, password }
            };

            const { data, message } = await fetchAPI(requestObject);
            dispatch(success(message));

            return data.user.id;
        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
            rejectWithValue(err);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'GET',
                url: 'logout'
            };

            const { message } = await fetchAPI(requestObject);
            dispatch(success(message));
            return;
        } catch (err) {
            console.error(err);
            dispatch(failure(err.message));
            rejectWithValue(err);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.loggedIn = true;
            state.user = payload;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loggedIn = true;
            state.user = payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loggedIn = false;
            state.user = null;
        });
        builder.addDefaultCase(state => state);
    }
});

export default authSlice.reducer;