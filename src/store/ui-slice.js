import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {cartIsVisable: false};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle(state) {
            state.cartIsVisable = !state.cartIsVisable
        }
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;