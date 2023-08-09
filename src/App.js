import Cart from './components/Cart/Cart';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisable);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    fetch('https://react-http-f885f-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT', body: JSON.stringify(cart)
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
