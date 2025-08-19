import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    addressList: []
}

export const addAddress = createAsyncThunk('/shop/addAddress', async ({ formData, userId }) => {
    const result = await axios.post(`http://localhost:5000/api/shop/address/add`, { ...formData, userId }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data
})

export const fetchAllAddresses = createAsyncThunk('/shop/fetchAllAddresses', async ({ userId }) => {
    const result = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`)
    return result?.data
})

export const deleteAddress = createAsyncThunk('/shop/deleteAddress', async ({ userId, addressId }) => {
    const result = await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`)
    return result?.data
})

export const updateAddress = createAsyncThunk('/shop/updateAddress', async ({ userId, addressId, formData }) => {
    const result = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data
})

const AddressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.data
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false
                state.addressList = []
            })
            .addCase(fetchAllAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.data
            })
            .addCase(fetchAllAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.addressList = []
            })
    }
})

export default AddressSlice.reducer