import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },

        //removeItemFromCart hye action creator
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }


    }
});

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
                body: JSON.stringify(cart)
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







export const cartActions = cartSlice.actions;

export default cartSlice;












//________________________________________________________________________________












// import { createSlice } from "@reduxjs/toolkit";


// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: [],
//         totalQuantity: 0,
//     },
//     reducers: {
//         addItemToCart(state, action) {
//             const newItem = action.payload;
//             const existingItem = state.items.find(item => item.id === newItem.id);
//             state.totalQuantity++;
//             if (!existingItem) {
//                 state.items.push({
//                     id: newItem.id,
//                     price: newItem.price,
//                     quantity: 1,
//                     totalPrice: newItem.price,
//                     name: newItem.title
//                 });
//             } else {
//                 existingItem.quantity++;
//                 existingItem.totalPrice = existingItem.totalPrice + newItem.price;
//             }
//         },


//         removeItemFromCart(state, action) {
//             const id = action.payload;
//             const existingItem = state.items.find(item => item.id === id);
//             state.totalQuantity--;
//             if (existingItem.quantity === 1) {
//                 state.items = state.items.filter(item => item.id !== id);
//             } else {
//                 existingItem.quantity--;
//                 existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
//             }
//         }


//     }
// });


// export const cartActions = cartSlice.actions;

// export default cartSlice;