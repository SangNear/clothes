import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllProduct = createAsyncThunk('/product/fetchallproduct', async () => {
    const result = await axios.get('http://localhost:5000/api/admin/products/getAllProducts')
    return result?.data
})

export const addNewProduct = createAsyncThunk('/product/addnewproduct', async (formData) => {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }

    })
    return result?.data
})

export const updateProduct = createAsyncThunk('/product/updateproduct', async ({ id, formData }) => {
    const result = await axios.put(`http://localhost:5000/api/admin/products/editProduct/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data
})

export const deleteProduct = createAsyncThunk('/product/deleteproduct', async ({ id }) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
    return result?.data
})
const AdminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {

                state.isLoading = false
                state.productList = action.payload.data
            })
    }

})

export default AdminProductSlice.reducer