import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import cartSlice from '../../store/cart-slice';
import { useSelector } from 'react-redux';

const Cart = (props) => {

  const cartitems = useSelector(state => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartitems.map(cartItem => (
            <CartItem
            key={cartItem.id}
            item={{ 
                    id: cartItem.id,
                    title: cartItem.name, 
                    quantity: cartItem.quantity, 
                    total: cartItem.totalPrice, 
                    price: cartItem.price,
                  }}
          />
        ))}

      </ul>
    </Card>
  );
};

export default Cart;
