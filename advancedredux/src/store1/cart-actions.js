
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCartData = createAsyncThunk(
    'cart/fetchData',
    async () => {
        const response = await fetch('https://reduxfood-default-rtdb.firebaseio.com/cart.json');
        if (!response.ok) throw new Error();
        const data = await response.json();
        return {
            items: data?.items || [],
            totalQuantity: data?.totalQuantity || 0
        };
    }

);

// console.log(fetchCartData());
export const sendCartData = createAsyncThunk(
    'cart/sendData',
    async (cart) => {
        const config = {
            method: 'PUT',
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            })
        };

        const response = await fetch('https://reduxfood-default-rtdb.firebaseio.com/cart.json', config);
        if (!response.ok) throw new Error();
    }
);




