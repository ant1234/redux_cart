import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchRequest = async () => {

            const response = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/cart.json');
    
            if(!response.ok) {
                throw new Error('An error happened');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchRequest();
            dispatch(cartActions.replaceCart(cartData));
        } catch(error) {
            dispatch(uiActions.showNotificaiton({
                status: 'error',
                title: 'Error happened when sending ...',
                message: 'Error sending cart data',
            }));
        }
    }
}

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