import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {


  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  /* we should add it as a dependency to useEffect
  so that this Effect function re-executes
  whenever our cart changes,which is exactly what we want. */

  useEffect(() => {
    fetch('https://reduxfood-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),

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
