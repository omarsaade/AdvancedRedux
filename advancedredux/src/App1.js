import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';


let isInitial = true;

function App1() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  /* we should add it as a dependency to useEffect
  so that this Effect function re-executes
  whenever our cart changes,which is exactly what we want. */

  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }));

      const response = await fetch(
        'https://reduxfood-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        });


      if (!response.ok) {
        throw new Error("Sending Cart data failed");
      }


      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sent cart data successfully!'
      }));


    };

    //  I just want to make sure that we don't send the cart
    // when this runs for the first time.
    if (isInitial) { isInitial = false; return }

    //run
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      }));
    });


  }, [cart, dispatch]);

  //thunk: a function that delays an action until later

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App1;
