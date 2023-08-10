import Cart from './components/Cart/Cart';
import { useEffect, Fragment } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisable);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
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
