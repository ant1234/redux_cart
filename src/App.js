import Cart from './components/Cart/Cart';
import { useEffect, Fragment } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisable);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

    useEffect(() => {
      const fetchCartData = async () => {

        dispatch(uiActions.showNotificaiton({
          status: 'pending',
          title: 'Sending ...',
          message: 'Sending cart data',
        }));

        const response = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT', body: JSON.stringify(cart)
        });

        if(!response.ok) {
          throw new Error('An error happened');
        }

        dispatch(uiActions.showNotificaiton({
          status: 'success',
          title: 'Success!',
          message: 'Successfully got cart data',
        }));

      };

      if(isInitial) {
        isInitial = false;
        return;
      }

      fetchCartData().catch(error => {
        dispatch(uiActions.showNotificaiton({
          status: 'error',
          title: 'Error happened when sending ...',
          message: 'Error sending cart data',
        }));
      });
    }, [cart, dispatch]);
  
  return (
    <Layout>
      {notification && <Notification 
                          status={notification.status} 
                          title={notification.title} 
                          message={notification.message}/>}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
