import { createSlice } from '@reduxjs/toolkit';
import { fetchCookies } from '../../utils/dataFetching';

const cookies = fetchCookies();

const initialState = {
    loggedIn: !!cookies['auth-uid'],
    user: cookies['auth-uid']
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, { payload: { loggedIn, user } }) {
            state.loggedIn = loggedIn;
            state.user = user;
        },
        logout(state) {
            state.loggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;