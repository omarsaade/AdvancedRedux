import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {

    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);


    /* Thunks are the standard approach for writing 
    async logic in Redux apps, and are commonly used 
    for data fetching.However, they
    can be used for a variety of tasks, and can contain 
    both synchronous and asynchronous logic. */


    useEffect(() => {


        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        // preventing the data to be sent for the first time because PUT will re-initialize
        // the data in the firsebase  
        if (isInitial) {
            isInitial = false;
            return;
        }
        //  Thunk functions are not directly called by application code
        //  .Instead, they are passed to store.dispatch():
        //now this useEffect only dispatch one action and all that hard work,
        // happens inside of our custom action creator function,in our Redux files.

        if (cart.changed) {
            dispatch(sendCartData(cart));

        }

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




export default App;
