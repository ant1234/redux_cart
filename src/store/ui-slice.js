import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {cartIsVisable: false, notification: null};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle(state) {
            state.cartIsVisable = !state.cartIsVisable
        }, 
        showNotificaiton(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;