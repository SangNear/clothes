import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    cart: []
}

export const addCart = createAsyncThunk('/cart/addCart', async ({ userId, productId, quantity }) => {
    const res = await axios.post("http://localhost:5000/api/products/cart/add", {
        userId, productId, quantity
    })
    return res?.data
})

export const fetchCart = createAsyncThunk('/cart/fetchCart', async (userId) => {
    const res = await axios.get(`http://localhost:5000/api/products/cart/fetchCart/${userId}`)
    return res?.data
})

export const deleteCart = createAsyncThunk('/cart/deleteCart', async ({ userId, productId }) => {
    const res = await axios.delete(`http://localhost:5000/api/products/cart/delete/${userId}/${productId}`)
    return res?.data
})

export const updateQTYCart = createAsyncThunk('/cart/updateQTYCart', async ({ userId, productId, quantity }) => {
    const res = await axios.put("http://localhost:5000/api/products/cart/updateQTY", {
        userId, productId, quantity
    })
    return res?.data
})

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.isLoading = true
                state.cart = action.payload.data
            })
            .addCase(addCart.rejected, (state) => {
                state.isLoading = false
                state.cart = []
            })
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = true
                state.cart = action.payload.data
            })
            .addCase(fetchCart.rejected, (state) => {
                state.isLoading = false
                state.cart = []
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = true
                state.cart = action.payload.data
                

            })
            .addCase(deleteCart.rejected, (state) => {
                state.isLoading = false

            })
            .addCase(updateQTYCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateQTYCart.fulfilled, (state, action) => {
                state.isLoading = true
                state.cart = action.payload.data
                console.log("updateQTY", action.payload);
            })
            .addCase(updateQTYCart.rejected, (state) => {
                state.isLoading = false
                
            })
    }
})

export default CartSlice.reducer