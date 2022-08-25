import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData } from './cart-actions';


const cartSlice = createSlice({
    name: 'cart',
    // If a property doesn't have a value, the Firebase Database doesn't store that property.That means that an empty array is not stored in the database and thus not read back.
    //  You'll have to re-create those properties yourself after you read the data back.
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {



        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
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
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }


    }, extraReducers: {
        [fetchCartData.fulfilled]: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    }


});




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