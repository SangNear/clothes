import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    productList: [],
    productDetail: null
}

export const fetchAllProductFilter = createAsyncThunk('/product/fetchallproductfilter', async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    })
    const result = await axios.get(`http://localhost:5000/api/products/get?${query}`)
    return result?.data
})

export const fetchProductDetails = createAsyncThunk('/product/fetchproductdetails', async (id) => {

    const result = await axios.get(`http://localhost:5000/api/products/get/${id}`)
    return result?.data
})

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductFilter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllProductFilter.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload.data
            })
            .addCase(fetchAllProductFilter.rejected, (state, action) => {
                state.isLoading = false
                state.productList = []
            })
            .addCase(fetchProductDetails.pending, (state) => {
                
                
                state.isLoading = true
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.productDetail = action.payload.data
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false
                state.productList = null
            })

    }
})

export default ProductSlice.reducer