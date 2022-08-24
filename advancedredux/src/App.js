import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';

let isInitial = true;

function App() {

    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);


    useEffect(() => {
        // preventing the data to be sent for the first time because PUT will re-initialize
        // the data in the firsebase  
        if (isInitial) {
            isInitial = false;
            return;
        }
        dispatch(sendCartData(cart));

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
