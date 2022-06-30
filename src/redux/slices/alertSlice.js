import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    severity: null,
    message: null
};


const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        success(state, { payload }) {
            state.open = true;
            state.severity = 'success';
            state.message = payload;
        },
        failure(state, { payload }) {
            state.open = true;
            state.severity = 'error';
            state.message = payload;
        },
        warning(state, { payload }) {
            state.open = true;
            state.severity = 'warning';
            state.message = payload;
        },
        info(state, { payload }) {
            state.open = true;
            state.severity = 'info';
            state.message = payload;
        },
        close(state) {
            state.open = false;
            state.severity = null;
            state.message = null;
        }
    }
});

export const { success, failure, warning, info, close } = alertSlice.actions;

export default alertSlice.reducer;