import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";



export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {

            const response = await fetch('https://reduxfood-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error("could not fetch cart data!");
            }

            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchData();

            // dispatch(cartActions.replaceCart({
            //     totalQuantity: cartData.totalQuantity,
            //     items: cartData.items || [],
            // }));

            if (cartData) dispatch(cartActions.replaceCart({
                totalQuantity: cartData.totalQuantity,
                items: cartData.items || [],
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!',
            }));
        }


    };
};











// https://www.digitalocean.com/community/tutorials/redux-redux-thunk


// Redux reducers must not contain side effects, but real applications require logic that has side effects.
// Some of that may live inside components, but some may need to live outside the UI layer
// .Thunks(and other Redux middleware) give us a place to put those side effects.


//  sendCartData is the "thunk action creator"
// Custom Action Creator
export const sendCartData = (cart) => {

    //  arrow functions is the "thunk function"
    return async (dispatch) => {
        // A thunk function may contain any arbitrary logic
        // , sync or async, and can call dispatch or getState
        //  at any time.
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        }));


        const sendRequest = async () => {
            const response = await fetch('https://reduxfood-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                }),
            })

            if (!response.ok) { throw new Error("Sending Cart data failed"); }
        };

        //try catch is used simply to handle any errors
        // try/catch which is synchronous

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!',
            }));
        }

    };
};





