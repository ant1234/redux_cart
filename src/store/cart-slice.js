import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItem(state, actions) {
            const newItem = actions.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price, 
                    name: newItem.title,
                });
            } else {
                existingItem.quantity = existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        }, 
        removeItem(state, actions) {
            const cartItem = actions.payload;
            const existingItem = state.items.find(item => item.id === cartItem.id);
            state.totalQuantity--;
            if(existingItem.quantity === 1) {
                console.log('inside the if');
                console.log(existingItem.quantity);
                state.items = state.items.filter(item => item.id !== cartItem.id);
            } else {
                existingItem.quantity--;
                console.log('inside the else');
                console.log(existingItem.quantity);
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;