import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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
                    quantity: newItem.quantity,
                    totalPrice: newItem.price, 
                    name: newItem.title,
                });

                console.log(newItem.quantity);


            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        }, 
        removeItem(state, actions) {
            const cartItem = actions.payload;
            const existingItem = state.items.find(item => item.id === cartItem.id);
            state.totalQuantity--;
            if(existingItem.quantity === 1) {
                console.log(existingItem.quantity);
                state.items = state.items.filter(item => item.id !== cartItem.id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {

        dispatch(uiActions.showNotificaiton({
            status: 'pending',
            title: 'Sending ...',
            message: 'Sending cart data',
          }));

        const sendRequest = async () => {

            const response = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT', body: JSON.stringify(cart)
                });
    
            if(!response.ok) {
                throw new Error('An error happened');
                }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotificaiton({
                status: 'success',
                title: 'Success!',
                message: 'Successfully got cart data',
            }));
        } catch(error) {
            dispatch(uiActions.showNotificaiton({
                status: 'error',
                title: 'Error happened when sending ...',
                message: 'Error sending cart data',
            }));
        }
    }
};

export const cartActions = cartSlice.actions;
export default cartSlice;