import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
  {
    id: 'p1',
    name: 'My first book',
    price: 6,
    description: 'The first book I ever wrote',
    quantity: 1,
  }, 
  {
    id: 'p2',
    name: 'My second book',
    price: 5,
    description: 'The second book I ever wrote',
    quantity: 1,
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map(product => (
            <ProductItem
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            quantity={product.quantity}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
